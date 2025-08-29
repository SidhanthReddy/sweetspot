import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { ErrorModal, ValidationModal } from "./ThemedModals";
import "../index.css"; // Tailwind CSS

const CreateImg = forwardRef(({ onImagesGenerated, onGenerateStart, isModal = false }, ref) => {
  const [prompt, setPrompt] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generatedPrompts, setGeneratedPrompts] = useState([]);
  const [lastGeneratedPrompt, setLastGeneratedPrompt] = useState(""); // Track last generated prompt

  // Modal states
  const [modals, setModals] = useState({
    error: false,
    validation: false,
    errorMessage: "",
    errorTitle: "",
  });

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`;

  // Modal helper functions
  const showErrorModal = (title, message) => {
    setModals(prev => ({
      ...prev,
      error: true,
      errorTitle: title,
      errorMessage: message,
    }));
  };

  const showValidationModal = () => {
    setModals(prev => ({
      ...prev,
      validation: true,
    }));
  };

  const closeModals = () => {
    setModals({
      error: false,
      validation: false,
      errorMessage: "",
      errorTitle: "",
    });
  };

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    generateImages: generateImage,
    reset: () => {
      setPrompt("");
      setImageUrls([]);
      setGeneratedPrompts([]);
      setLoading(false);
      setLastGeneratedPrompt("");
      closeModals(); // Also close any open modals
    },
    getCurrentPrompt: () => prompt,
    getGeneratedPrompts: () => generatedPrompts
  }));

  useEffect(() => {
    if (!prompt) {
      setImageUrls([]);
      setGeneratedPrompts([]);
      return;
    }

    // Only auto-generate if not in modal mode
    if (!isModal) {
      const delayDebounce = setTimeout(() => {
        generateImage();
      }, 800); // debounce typing

      return () => clearTimeout(delayDebounce);
    }
  }, [prompt, isModal]);

  const generateCreativePrompts = async (userPrompt, batchNumber = 1) => {
    try {
      const systemPrompt = `You are a passionate cake designer who aspires to fulfill every client's dream cake vision. Your mission is to interpret "${userPrompt}" as creatively as possible while staying within realistic cake-making boundaries.

PRIMARY GOAL: Honor the user's request above all else. If they want "${userPrompt}", find 3 different realistic ways to make that vision come to life.

REALISTIC CONSTRAINTS (never compromise the user's vision, but ensure it's achievable):
- Use only real cake decorating techniques (buttercream, fondant, ganache, fresh elements, edible decorations)
- Structurally sound and physically possible
- Based on actual cake types and realistic proportions
- Use realistic food colors and edible materials only

Your 3 interpretations should vary in:
- Decoration approach (different techniques to achieve the user's vision)
- Style presentation (elegant vs rustic vs modern interpretation of their idea)
- Scale/format (different sizes or arrangements of their concept)

${batchNumber > 1 ? `This is batch ${batchNumber}. Create completely different realistic interpretations of "${userPrompt}" from previous batches. Think of new ways to bring their vision to life.` : ''}

ALWAYS prioritize what the user wants. If they say "rainbow cake" - give them colorful rainbow designs. If they say "unicorn cake" - create realistic unicorn-themed cakes with edible decorations. Make their dreams achievable!

Format as exactly 3 lines starting with "PROMPT:". Focus on making their specific request come to life realistically.`;

      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: systemPrompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const generatedText = data.candidates[0]?.content?.parts[0]?.text || "";
      
      // Extract prompts from the response
      const promptLines = generatedText.split('\n').filter(line => line.startsWith('PROMPT:'));
      const cleanedPrompts = promptLines.map(line => 
        line.replace('PROMPT:', '').trim()
      ).filter(prompt => prompt.length > 0);

      // Ensure we have exactly 3 prompts, all realistic
      if (cleanedPrompts.length < 3) {
        // Realistic fallback prompts if Gemini doesn't generate enough
        const fallbackPrompts = [
          `Classic ${userPrompt} cake with buttercream frosting and traditional decorations, professional bakery photography`,
          `Elegant ${userPrompt} layer cake with smooth fondant and simple piped details, natural lighting`,
          `Rustic ${userPrompt} cake with cream cheese frosting and fresh fruit toppings, artisanal bakery style`
        ];
        return fallbackPrompts.slice(0, 3 - cleanedPrompts.length).concat(cleanedPrompts).slice(0, 3);
      }

      return cleanedPrompts.slice(0, 3);
    } catch (error) {
      console.error('Error generating creative prompts:', error);
      // Show error modal instead of console error only
      showErrorModal("Prompt Generation Error", "Unable to generate creative cake designs. Please check your internet connection and try again.");
      
      // Realistic fallback prompts
      return [
        `Traditional ${userPrompt} cake with buttercream frosting and classic decorations, professional bakery photography`,
        `Simple ${userPrompt} layer cake with smooth ganache and fresh fruit, natural lighting, realistic bakery style`,
        `Elegant ${userPrompt} cake with fondant covering and delicate piped flowers, artisanal quality, food photography`
      ];
    }
  };

  const generateImage = async (batchNumber = 1) => {
    if (!prompt.trim()) {
      if (isModal) {
        showValidationModal();
      }
      return;
    }

    setLoading(true);
    
    // Notify parent that generation has started (for loading display)
    if (onGenerateStart) {
      onGenerateStart();
    }

    try {
      // Generate creative prompts using Gemini
      const creativePrompts = await generateCreativePrompts(prompt, batchNumber);
      
      // Generate image URLs using the creative prompts with stronger realism constraints
      const urls = creativePrompts.map(creativePrompt => {
        const fullPrompt = `realistic cake photography, professional bakery, real cake, achievable design, ${creativePrompt}, high quality food photography, no fantasy elements, physically possible`;
        return `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=512&height=512&seed=${Math.floor(Math.random() * 1000000)}`;
      });

      // Store the generated prompts for reference
      const newGeneratedPrompts = creativePrompts.map((prompt, index) => ({
        prompt,
        url: urls[index],
        batch: batchNumber
      }));

      setTimeout(() => {
        if (batchNumber === 1) {
          // First batch - replace existing images
          setImageUrls(urls);
          setGeneratedPrompts(newGeneratedPrompts);
        } else {
          // Additional batches - append to existing images
          setImageUrls(prev => [...prev, ...urls]);
          setGeneratedPrompts(prev => [...prev, ...newGeneratedPrompts]);
        }
        
        setLoading(false);
        
        // Pass generated images to parent (QuickDrawModal)
        if (onImagesGenerated) {
          const imageData = urls.map((url, index) => ({
            url,
            prompt: creativePrompts[index] || prompt,
            batch: batchNumber
          }));
          onImagesGenerated(imageData, batchNumber > 1);
        }
      }, 1500);
    } catch (error) {
      console.error(error);
      showErrorModal("Image Generation Error", "There was an error generating your cake images. Please check your internet connection and try again.");
      setLoading(false);
    }
  };

  // If used in modal, return a simplified interface
  if (isModal) {
    return (
      <div className="space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && generateImage()}
            placeholder="Describe your cake design (e.g., 'chocolate birthday cake with roses')"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[rgba(224,99,99,0.85)] text-sm"
          />
          <button
            onClick={() => generateImage()}
            disabled={loading || !prompt.trim()}
            className="bg-[rgba(224,99,99,0.85)] text-white px-6 py-3 text-sm font-medium hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <p className="text-xs text-gray-500">
          Our AI will create 3 unique, realistic cake designs based on your description
        </p>
        
        {/* Modals for modal mode */}
        <ValidationModal
          isOpen={modals.validation}
          onClose={closeModals}
          title="Cake Description Required"
          message="Please enter a description for your cake design to generate images."
          actionText="Got it"
        />

        <ErrorModal
          isOpen={modals.error}
          onClose={closeModals}
          title={modals.errorTitle}
          message={modals.errorMessage}
          actionText="Try Again"
        />
      </div>
    );
  }

  // Original standalone component UI
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        AI Cake Generator
      </h1>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter cake style or theme..."
        className="border border-gray-400 p-3 rounded w-64 sm:w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {loading && (
        <div className="mt-6 text-gray-500 animate-pulse">
          Creating unique designs...
        </div>
      )}

      {imageUrls.length > 0 && !loading && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {imageUrls.map((url, idx) => (
            <img
              draggable="false"
              key={idx}
              src={url}
              alt={`Cake Design ${idx + 1}`}
              className="w-64 sm:w-72 rounded shadow-lg border border-gray-300"
            />
          ))}
        </div>
      )}

      {/* Modals for standalone mode */}
      <ErrorModal
        isOpen={modals.error}
        onClose={closeModals}
        title={modals.errorTitle}
        message={modals.errorMessage}
        actionText="Try Again"
      />
    </div>
  );
});

CreateImg.displayName = 'CreateImg';

export default CreateImg;