import React from 'react';

const InfoPanel = () => {
  const [expandedPanel, setExpandedPanel] = React.useState(null);

  const togglePanel = (panel) => {
    setExpandedPanel(expandedPanel === panel ? null : panel);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="sweet-card border-2 border-primary/20 hover:border-primary/40">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7m16 0l-8 4m0 0L4 7m8 4v10" />
              </svg>
              <div>
                <h3 className="font-semibold text-lg text-primary">Order Guidelines</h3>
                <p className="text-sm text-muted-foreground">Important order information</p>
              </div>
            </div>
            <button
              className="sweet-button text-primary hover:text-primary/80 p-2 rounded-full"
              onClick={() => togglePanel('guidelines')}
            >
              {expandedPanel === 'guidelines' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
          </div>
          {expandedPanel === 'guidelines' && (
            <div className="mt-6 pt-6 border-t border-border/50 animate-fade-in space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-sweetspot-main mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-foreground">Delivery Times</h4>
                    <p className="text-sm text-muted-foreground">Standard: 2-4 hours<br />Express: 1-2 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-sweetspot-alt1 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7m16 0l-8 4m0 0L4 7m8 4v10" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-foreground">Order Changes</h4>
                    <p className="text-sm text-muted-foreground">Modifications possible<br />until baking starts</p>
                  </div>
                </div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4 border border-border/30">
                <h4 className="font-medium text-secondary-foreground mb-2">Quality Promise</h4>
                <p className="text-sm text-muted-foreground">Every cake goes through our 3-stage quality check to ensure perfection before delivery.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="sweet-card border-2 border-sweetspot-alt1/20 hover:border-sweetspot-alt1/40">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-sweetspot-alt1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <h3 className="font-semibold text-lg text-sweetspot-alt1">Contact & Support</h3>
                <p className="text-sm text-muted-foreground">Get help with your orders</p>
              </div>
            </div>
            <button
              className="sweet-button text-sweetspot-alt1 hover:text-sweetspot-alt1/80 p-2 rounded-full"
              onClick={() => togglePanel('support')}
            >
              {expandedPanel === 'support' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
          </div>
          {expandedPanel === 'support' && (
            <div className="mt-6 pt-6 border-t border-border/50 animate-fade-in space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-foreground">Customer Care</h4>
                    <p className="text-sm text-muted-foreground">+91 98765 43210<br />Available 24/7</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-sweetspot-alt3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 6.343a8 8 0 010 11.314m-2.829-8.485a4 4 0 010 5.657M12 4v16m-8-8h16" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-foreground">Delivery Areas</h4>
                    <p className="text-sm text-muted-foreground">Bangalore Metro<br />10km radius</p>
                  </div>
                </div>
              </div>
              <div className="bg-accent/30 rounded-lg p-4 border border-border/30">
                <h4 className="font-medium text-accent-foreground mb-2">Need Help?</h4>
                <p className="text-sm text-muted-foreground">Our support team is ready to assist with order tracking, modifications, or any special requests.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;