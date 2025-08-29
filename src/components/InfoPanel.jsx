import React from "react";

const InfoPanel = () => {
  const [expandedPanel, setExpandedPanel] = React.useState(null);

  const togglePanel = (panelId) => {
    setExpandedPanel((prev) => (prev === panelId ? null : panelId));
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-4 font-parastoo text-[rgba(79,79,79,0.66)]">
      {/* Order Guidelines Panel */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden transition-all duration-300">
        <div
          className="p-6 cursor-pointer flex items-center justify-between bg-white hover:bg-gray-50 transition-all duration-300"
          onClick={() => togglePanel("guidelines")}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[rgba(224,99,99,0.85)] rounded-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 7l-8-4-8 4m16 0v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7m16 0l-8 4m0 0L4 7m8 4v10"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[rgba(79,79,79,0.66)]">
                Order Guidelines
              </h3>
              <p className="text-gray-500 text-sm">
                Important order information and policies
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded">
              {expandedPanel === "guidelines" ? "Hide" : "Show"} Details
            </span>
            <div
              className={`transform transition-transform duration-300 ${
                expandedPanel === "guidelines" ? "rotate-180" : ""
              }`}
            >
              <svg
                className="w-6 h-6 text-[rgba(224,99,99,0.85)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {expandedPanel === "guidelines" && (
          <div className="p-6 border-t border-gray-300 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded p-5 border border-gray-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded">
                    <svg
                      className="w-5 h-5 text-[rgba(79,79,79,0.66)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-[rgba(79,79,79,0.66)] mb-1">
                      Delivery Times
                    </h4>
                    <div className="space-y-1 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <span>Standard:</span>
                        <span className="font-medium">2-4 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Express:</span>
                        <span className="font-medium">1-2 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded p-5 border border-gray-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded">
                    <svg
                      className="w-5 h-5 text-[rgba(79,79,79,0.66)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-[rgba(79,79,79,0.66)] mb-1">
                      Order Changes
                    </h4>
                    <p className="text-sm text-gray-700">
                      Contact Us through our customer support to make any
                      changes to your order.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[rgba(224,99,99,0.85)] rounded p-6 text-white">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/20 rounded">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Quality Promise</h4>
                  <p className="text-white/90">
                    Every cake goes through our 3-stage quality check to ensure
                    perfection before delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact & Support Panel */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden transition-all duration-300">
        <div
          className="p-6 cursor-pointer flex items-center justify-between bg-white hover:bg-gray-50 transition-all duration-300"
          onClick={() => togglePanel("support")}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[rgba(224,99,99,0.85)] rounded-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[rgba(79,79,79,0.66)]">
                Contact & Support
              </h3>
              <p className="text-gray-500 text-sm">
                Get help with your orders anytime
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded">
              {expandedPanel === "support" ? "Hide" : "Show"} Details
            </span>
            <div
              className={`transform transition-transform duration-300 ${
                expandedPanel === "support" ? "rotate-180" : ""
              }`}
            >
              <svg
                className="w-6 h-6 text-[rgba(224,99,99,0.85)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {expandedPanel === "support" && (
          <div className="p-6 border-t border-gray-300 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded p-5 border border-gray-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded">
                    <svg
                      className="w-5 h-5 text-[rgba(79,79,79,0.66)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-[rgba(79,79,79,0.66)] mb-1">
                      Customer Care
                    </h4>
                    <div className="space-y-1 text-sm text-gray-700">
                      <div className="font-medium">+91 98765 43210</div>
                      <div className="text-[rgba(224,99,99,0.85)] font-medium">
                        Available 24/7
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded p-5 border border-gray-300">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded">
                    <svg
                      className="w-5 h-5 text-[rgba(79,79,79,0.66)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-[rgba(79,79,79,0.66)] mb-1">
                      Delivery Areas
                    </h4>
                    <div className="space-y-1 text-sm text-gray-700">
                      <div>Hyderabad, Vijaywada, Bangalore</div>
                      <div className="text-[rgba(224,99,99,0.85)] font-medium">
                        30km radius
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[rgba(224,99,99,0.85)] rounded p-6 text-white">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/20 rounded">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 11-9.75 9.75 9.75 9.75 0 019.75-9.75zm-.75 0V5.25A2.25 2.25 0 0113.5 7.5h2.25"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Need Help?</h4>
                  <p className="text-white/90">
                    Our support team is ready to assist with order tracking,
                    modifications, or any special requests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;
