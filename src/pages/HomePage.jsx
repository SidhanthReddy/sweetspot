import React from 'react';
import ParallaxCollection from '../components/ParallaxCollection';
import NavBar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
function HomePage() {
  return (
    <div>
     <NavBar />
    <ParallaxCollection />
    <Footer />
    </div>

  )
}

export default HomePage