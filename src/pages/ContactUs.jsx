import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Calendar, Users, Award, CheckCircle, ChevronDown } from 'lucide-react';
import React, { useState, useRef } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';  
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Create custom marker icon
const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  
  const toggleFAQ = (index) => {
      setOpenFAQ(openFAQ === index ? null : index);
    };  
  const specialties = [
    { icon: Calendar, title: 'Custom Orders', desc: 'Personalized cakes for special occasions' },
    { icon: Users, title: 'Bulk Orders', desc: 'Corporate events & large celebrations' },
    { icon: Award, title: 'Premium Designs', desc: 'Award-winning cake artistry' }
  ];
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");
  const [ratingError, setRatingError] = useState("");
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e && e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      info: '+91 98765 43210',
      subInfo: 'Mon-Sat: 9AM-10PM, Sun: 10AM-9PM',
      color: 'rgba(224, 99, 99, 0.85)'
    },
    {
      icon: Mail,
      title: 'Email Us',
      info: 'hello@sweetspot.com',
      subInfo: 'We reply within 24 hours',
      color: 'rgba(224, 99, 99, 0.85)'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      info: '123 Sweet Street, Cake Town',
      subInfo: 'Mumbai - 400001',
      color: 'rgba(224, 99, 99, 0.85)'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      info: '+91 98765 43210',
      subInfo: 'Quick responses & order updates',
      color: 'rgba(224, 99, 99, 0.85)'
    }
  ];

  const faqData = [
    {
      question: "How far in advance should I place my order?",
      answer: "For custom cakes, we recommend placing orders at least 48-72 hours in advance. For special occasions like weddings or large events, 1 week notice is preferred to ensure we can accommodate all your requirements."
    },
    {
      question: "Do you offer delivery services?",
      answer: "Yes! We deliver within Mumbai and surrounding areas. Delivery charges apply based on distance. We also offer free delivery for orders above ₹2000 within a 5km radius of our bakery."
    },
    {
      question: "Can you accommodate dietary restrictions?",
      answer: "Absolutely! We offer sugar-free, gluten-free, vegan, and eggless options. Please specify your dietary requirements when placing your order, and we'll create something delicious that meets your needs."
    },
    {
      question: "What's your cancellation policy?",
      answer: "Orders can be cancelled up to 24 hours before delivery for a full refund. Custom orders require 48 hours notice due to the preparation involved. Wedding cakes require 72 hours notice for cancellation."
    },
    {
      question: "Do you provide cake tasting sessions?",
      answer: "Yes! We offer cake tasting sessions for custom orders above ₹3000. Schedule an appointment with us to try different flavors and finalize your perfect cake."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash, all major credit/debit cards, UPI payments, and online bank transfers. For large orders, we also accept partial advance payments."
    }
  ];
  const feedbackRef = useRef();

  const handleFeedbackSubmit = (e) => {
    e && e.preventDefault();
    const feedbackText = feedbackRef.current?.value?.trim() || '';

    let hasError = false;

    if (selectedRating === 0) {
      setRatingError("Please select a rating.");
      hasError = true;
    } else {
      setRatingError("");
    }

    if (!feedbackText) {
      setFeedbackError("Please write your feedback.");
      hasError = true;
    } else {
      setFeedbackError("");
    }

    if (hasError) return;

    setShowThankYou(true);
    setTimeout(() => {
      setShowThankYou(false);
      setShowFeedback(false);
      setSelectedRating(0);
      e.target.reset();
    }, 1500);
  };

  // Coordinates for 123 Sweet Street, Cake Town, Mumbai (using Colaba area coordinates)
  const position = [18.9217, 72.8342];

  return (
    <>
    <NavBar />
    <div className="min-h-screen bg-soft-pink">
      {/* Hero Section */}
      <div className="relative bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-parastoo text-5xl text-[rgba(79,79,79,0.66)] mb-4">
            Get in <span className="text-6xl" style={{ color: 'rgba(224, 99, 99, 0.85)' }}>Touch</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-parastoo leading-relaxed">
            Have a sweet idea? We'd love to hear from you! Whether you're planning a special celebration or just want to say hello, we're here to help make your cake dreams come true.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full opacity-10" style={{ backgroundColor: 'rgba(224, 99, 99, 0.85)' }}></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full opacity-10" style={{ backgroundColor: 'rgba(224, 99, 99, 0.85)' }}></div>
      </div>

      {/* Contact Cards Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group cursor-pointer">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300" 
                       style={{ backgroundColor: `${contact.color}15` }}>
                    <IconComponent className="h-8 w-8" style={{ color: contact.color }} />
                  </div>
                  <h3 className="font-parastoo text-xl font-semibold text-[rgba(79,79,79,0.66)] mb-2">
                    {contact.title}
                  </h3>
                  <p className="font-parastoo text-lg font-medium mb-1" style={{ color: contact.color }}>
                    {contact.info}
                  </p>
                  <p className="text-sm text-gray-600 font-parastoo">
                    {contact.subInfo}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg h-fit">
            <h2 className="font-parastoo text-3xl text-[rgba(79,79,79,0.66)] mb-6">
              Send us a Message
            </h2>
            
            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-700 font-parastoo">Thank you! We'll get back to you soon.</span>
              </div>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name*"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[rgba(224,99,99,0.85)] font-parastoo"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email*"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[rgba(224,99,99,0.85)] font-parastoo"
                    />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[rgba(224,99,99,0.85)] font-parastoo"
                  />
                </div>
                <div>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[rgba(224,99,99,0.85)] font-parastoo"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="catering">Event Catering</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject*"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[rgba(224,99,99,0.85)] font-parastoo"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Tell us about your sweet dreams...*"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[rgba(224,99,99,0.85)] font-parastoo resize-none"
                ></textarea>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-[rgba(224,99,99,0.85)] text-white py-4 px-6 rounded-lg font-parastoo text-lg hover:bg-opacity-90 transition-colors duration-300 flex items-center justify-center"
              >
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </button>
            </div>
          </div>

          {/* Right Side - Info & Map */}
          <div className="space-y-6">
            {/* Business Hours */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 mr-3" style={{ color: 'rgba(224, 99, 99, 0.85)' }} />
                <h3 className="font-parastoo text-2xl text-[rgba(79,79,79,0.66)]">Business Hours</h3>
              </div>
              <div className="space-y-2 font-parastoo text-gray-700">
                <div className="flex justify-between">
                  <span>Monday - Saturday</span>
                  <span className="font-semibold">9:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold">10:00 AM - 9:00 PM</span>
                </div>
                <div className="mt-3 p-3 bg-[rgba(224,99,99,0.05)] rounded-lg">
                  <p className="text-sm">
                    <strong>Note:</strong> For custom orders, please place your order at least 48 hours in advance in <button onClick={() => { navigate('/customize'); window.scrollTo(0, 0); }} className="text-[rgba(224,99,99,0.85)] bg-none ">customization page</button>.
                  </p>
                </div>
              </div>
            </div>

            {/* Our Specialties */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-parastoo text-2xl text-[rgba(79,79,79,0.66)] mb-4">Our Specialties</h3>
              <div className="space-y-3">
                {specialties.map((specialty, index) => {
                  const IconComponent = specialty.icon;
                  return (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 mb-2 rounded-full flex items-center justify-center mr-3" 
                           style={{ backgroundColor: 'rgba(224,99,99,0.1)' }}>
                        <IconComponent className="h-4 w-4" style={{ color: 'rgba(224, 99, 99, 0.85)' }} />
                      </div>
                      <div>
                        <h4 className="font-parastoo font-semibold text-[rgba(79,79,79,0.66)] mb-1 text-md">
                          {specialty.title}
                        </h4>
                        <p className="text-sm text-gray-600 font-parastoo">
                          {specialty.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Feedback Button */}
              <div className="pt-4 text-center">
                <button
                  onClick={() => setShowFeedback(true)}
                  className="bg-[rgba(224,99,99,0.85)] text-white px-6 py-2 rounded-lg mb-2 font-parastoo hover:bg-opacity-90 transition-colors duration-300"
                >
                  Give Feedback ⭐
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
       {/* Interactive Map */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden my-16 relative z-0 mx-[20px] sm:mx-[30px] lg:mx-[200px] ">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-parastoo text-xl text-[rgba(79,79,79,0.66)] flex items-center">
            <MapPin className="h-5 w-5 mr-2" style={{ color: 'rgba(224, 99, 99, 0.85)' }} />
              Find Us Here
          </h3>
        </div>
        <MapContainer
          center={position}
          zoom={15}
          style={{
            height: window.innerWidth < 640 ? '180px' : window.innerWidth < 1024 ? '250px' : '380px',
            width: '100%',
            zIndex: 1
          }}
          zoomControl={true}
          scrollWheelZoom={false}
        >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            Sweet Spot Bakery<br />123 Sweet Street, Cake Town, Mumbai
          </Popup>
        </Marker>
        </MapContainer>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16 border-b-[2px] border-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="font-parastoo text-4xl text-[rgba(79,79,79,0.66)] text-center mb-12">
            Frequently Asked <span style={{ color: 'rgba(224, 99, 99, 0.85)' }}>Questions</span>
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                  >
                  <h4 className="font-parastoo text-lg font-semibold text-[rgba(79,79,79,0.66)] pr-4">
                    {faq.question}
                  </h4>
                  <ChevronDown 
                    className={`h-5 w-5 transition-transform duration-300 flex-shrink-0 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                    style={{ color: 'rgba(224, 99, 99, 0.85)' }}
                    />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-4 pt-2 bg-gray-50">
                    <p className="text-gray-600 font-parastoo leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 z-10 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl relative font-parastoo">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
              onClick={() => setShowFeedback(false)}
              >
              ×
            </button>

            {!showThankYou ? (
              <>
                <h2 className="text-3xl font-bold text-center mb-6 text-[rgba(79,79,79,0.66)]">
                  We Value Your Feedback
                </h2>
                <div className="space-y-6 text-black">
                  <div>
                    <label className="block text-lg mb-1 font-parastoo">Your Name (Optional)</label>
                    <input
                      type="text"
                      name="feedbackName"
                      placeholder="Enter your name"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[rgba(224,99,99,0.85)] font-parastoo"
                      />
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-lg mb-1 font-parastoo">Rating</label>
                    <div className="flex space-x-2 text-3xl">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                        key={star}
                        type="button"
                        onClick={() => setSelectedRating(star)}
                        className={`transition-all duration-150 ${
                          star <= selectedRating ? 'text-yellow-400 scale-110' : 'text-gray-300'
                        }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    {ratingError && (
                      <p className="text-red-600 text-sm mt-1 font-parastoo">{ratingError}</p>
                    )}
                    {selectedRating > 0 && (
                      <p className="text-sm mt-1 text-[rgba(79,79,79,0.8)] font-parastoo">
                        You rated: {selectedRating} star{selectedRating > 1 ? 's' : ''}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-lg mb-1 font-parastoo">Your Feedback</label>
                    <textarea
                      ref={feedbackRef}
                      name="feedback"
                      rows="4"
                      placeholder="Write your thoughts here..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[rgba(224,99,99,0.85)] font-parastoo resize-none"
                      ></textarea>
                    {feedbackError && (
                      <p className="text-red-600 text-sm mt-1 font-parastoo">{feedbackError}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleFeedbackSubmit}
                    className="w-full bg-[rgba(224,99,99,0.85)] text-white py-3 px-6 rounded-lg font-parastoo text-lg hover:bg-opacity-90 transition-colors duration-300"
                    >
                    Submit Feedback
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-3xl font-semibold text-[rgba(79,79,79,0.66)] mb-4 font-parastoo">
                  Thank you for your feedback! 💖
                </h3>
                <p className="text-gray-600 font-parastoo">
                  Your input helps us serve you better!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      
    </div>
    <Footer />
    </>
  );
};

export default ContactUs;