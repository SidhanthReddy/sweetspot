
// OrderTrackingPage.jsx
import React from 'react';
import OrderList from '../components/OrderList.jsx';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import InfoPanel from '../components/InfoPanel.jsx';
import HeroOfOrderTrack from '../components/HeroOfOrderTrack.jsx';
import '../OrderTracking.css';

const OrderTrackingPage = () => {
  return (
    <main className="min-h-screen bg-soft-pink font-parastoo">
      <NavBar />
       <HeroOfOrderTrack />
        <OrderList />
       <InfoPanel />
      <Footer />
    </main>
  );
};

export default OrderTrackingPage;