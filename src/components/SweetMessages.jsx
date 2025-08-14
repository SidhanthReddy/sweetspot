import React from 'react';

const mockMessages = {
  "SW2025-001": ["Your cake is in quality check!", "Will dispatch soon."],
  "SW2025-002": ["Baking started at 9 AM", "Estimated delivery by 5 PM"],
  "SW2025-003": ["Delivered to security guard at 3 PM"],
  "SW2025-004": [],
};

const SweetMessages = ({ orderId }) => {
  const messages = mockMessages[orderId] || [];

  return (
    <div className="p-4 bg-accent/20 rounded-lg">
      <h4 className="font-medium text-foreground mb-2">Messages</h4>
      {messages.length === 0 ? (
        <p className="text-sm text-muted-foreground">No messages for order {orderId}</p>
      ) : (
        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SweetMessages;
