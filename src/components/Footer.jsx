// import React from 'react';
// import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// const Footer = () => {
//   const navigate = useNavigate();
//   const handleNavigation = (path) => {
//     navigate(path);
//     window.scrollTo(0, 0);
//   };
  
//   return (
//     <footer className="bg-white pt-14">
//       <div className="container mx-auto pt-6 pb-12 ml-4">
//         <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
//           {/* Company Info - spans full width on mobile */}
//           <div className="col-span-2 lg:col-span-1">
//             <h3 className="text-3xl font-bold font-parastoo mb-4" style={{ color: 'rgba(79,79,79,0.7)' }}>
//               Sweet<span style={{ color: 'rgba(224, 99, 99, 0.85)' }}>Spot</span>
//             </h3>
//             <p className="font-parastoo mb-4" style={{ color: 'rgba(79,79,79,0.7)' }}>
//               Crafting delicious moments since 2020. Your trusted partner for all celebration cakes and sweet treats.
//             </p>
//             <p className="text-sm italic font-parastoo mb-4" style={{ color: 'rgba(79,79,79,0.7)' }}>
//               "Where every bite tells a sweet story"
//             </p>
//             <div className="flex space-x-4">
//               <a href="#" className="transition-colors hover:opacity-80" 
//                  style={{ color: 'rgba(224, 99, 99, 0.85)' }}>
//                 <Facebook className="h-5 w-5" />
//               </a>
//               <a href="#" className="transition-colors hover:opacity-80" 
//                  style={{ color: 'rgba(224, 99, 99, 0.85)' }}>
//                 <Twitter className="h-5 w-5" />
//               </a>
//               <a href="#" className="transition-colors hover:opacity-80" 
//                  style={{ color: 'rgba(224, 99, 99, 0.85)' }}>
//                 <Instagram className="h-5 w-5" />
//               </a>
//               <a href="#" className="transition-colors hover:opacity-80" 
//                  style={{ color: 'rgba(224, 99, 99, 0.85)' }}>
//                 <Youtube className="h-5 w-5" />
//               </a>
//             </div>
//           </div>

//           {/* Quick Links - half width on mobile */}
//           <div className="col-span-1">
//             <h4 className="text-lg font-semibold font-parastoo mb-4" style={{ color: 'rgba(79,79,79,0.7)' }}>
//               Quick Links
//             </h4>
//             <ul className="space-y-2">
//             <li>
//               <button
//                 onClick={() => handleNavigation('/about')}
//                 className="font-parastoo transition-colors hover:opacity-80 text-left p-0 m-0 bg-transparent border-none cursor-pointer"
//                 style={{ color: 'rgba(79,79,79,0.7)' }}
//               >
//                 About Us
//               </button>
//             </li>
//               <li><a href="/cakes" className="font-parastoo transition-colors hover:opacity-80" 
//                      style={{ color: 'rgba(79,79,79,0.7)' }}>Menu</a></li>
//               <li><a href="/customize" className="font-parastoo transition-colors hover:opacity-80" 
//                      style={{ color: 'rgba(79,79,79,0.7)' }}>Custom Orders</a></li>
//               <li><a href="/contact-us" className="font-parastoo transition-colors hover:opacity-80" 
//                      style={{ color: 'rgba(79,79,79,0.7)' }}>Bulk Orders</a></li>
//             </ul>
//           </div>

//           {/* Categories - half width on mobile, paired with Quick Links */}
//           <div className="col-span-1">
//             <h4 className="text-lg font-semibold font-parastoo mb-4" style={{ color: 'rgba(79,79,79,0.7)' }}>
//               Categories
//             </h4>
//             <ul className="space-y-2">
//               <li><a href="/cakes" className="font-parastoo transition-colors hover:opacity-80" 
//                      style={{ color: 'rgba(79,79,79,0.7)' }}>Birthday Cakes</a></li>
//               <li><a href="/cakes" className="font-parastoo transition-colors hover:opacity-80" 
//                      style={{ color: 'rgba(79,79,79,0.7)' }}>Wedding Cakes</a></li>
//               <li><a href="/cakes" className="font-parastoo transition-colors hover:opacity-80" 
//                      style={{ color: 'rgba(79,79,79,0.7)' }}>Designer Cakes</a></li>
//               <li><a href="/cakes" className="font-parastoo transition-colors hover:opacity-80" 
//                      style={{ color: 'rgba(79,79,79,0.7)' }}>Sugar Free</a></li>
//               <li><a href="/cakes" className="font-parastoo transition-colors hover:opacity-80" 
//                      style={{ color: 'rgba(79,79,79,0.7)' }}>Cupcakes</a></li>
//             </ul>
//           </div>

//           {/* Contact Info - half width on mobile */}
//           <div className="col-span-1">
//             <h4 className="text-lg font-semibold font-parastoo mb-4" style={{ color: 'rgba(79,79,79,0.7)' }}>
//               Contact Us
//             </h4>
//             <div className="space-y-3">
//               <div className="flex items-center space-x-3">
//                 <Phone className="h-4 w-4" style={{ color: 'rgba(224, 99, 99, 0.85)' }} />
//                 <span className="font-parastoo" style={{ color: 'rgba(79,79,79,0.7)' }}>+91 98765 43210</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <Mail className="h-4 w-4" style={{ color: 'rgba(224, 99, 99, 0.85)' }} />
//                 <span className="font-parastoo" style={{ color: 'rgba(79,79,79,0.7)' }}>hello@sweetspot.com</span>
//               </div>
//               <div className="flex items-start space-x-3">
//                 <MapPin className="h-4 w-4 mt-1" style={{ color: 'rgba(224, 99, 99, 0.85)' }} />
//                 <span className="font-parastoo" style={{ color: 'rgba(79,79,79,0.7)' }}>
//                   123 Sweet Street, Cake Town, 
//                   <br />Mumbai - 400001
//                 </span>
//               </div>
//             </div>
//           </div>
          
//           {/* Business Hours - half width on mobile, paired with Contact Info */}
//           <div className="col-span-1">
//             <h4 className="text-lg font-semibold font-parastoo mb-4" style={{ color: 'rgba(79,79,79,0.7)' }}>
//               Business Hours
//             </h4>
//             <p className="text-sm font-parastoo" style={{ color: 'rgba(79,79,79,0.7)' }}>
//               Mon - Sat: 9:00 AM - 10:00 PM<br />
//               Sunday: 10:00 AM - 9:00 PM
//             </p>
//           </div>
//         </div>

//         {/* Bottom section */}
//         <div className="border-t border-gray-100 mt-8 pt-6">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <p className="text-sm font-parastoo" style={{ color: 'rgba(79,79,79,0.7)' }}>
//               © 2024 SweetSpot. All rights reserved.
//             </p>
//             <div className="flex space-x-6 mt-4 md:mt-0">
//               <a href="#" className="text-sm font-parastoo transition-colors hover:opacity-80" 
//                  style={{ color: 'rgba(79,79,79,0.7)' }}>Privacy Policy</a>
//               <a href="#" className="text-sm font-parastoo transition-colors hover:opacity-80" 
//                  style={{ color: 'rgba(79,79,79,0.7)' }}>Terms of Service</a>
//               <a href="#" className="text-sm font-parastoo transition-colors hover:opacity-80" 
//                  style={{ color: 'rgba(79,79,79,0.7)' }}>Refund Policy</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };
  
  return (
    <footer className="bg-white pt-14">
      <div className="container mx-auto pt-6 pb-12 px-4 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info - spans full width on mobile */}
          <div className="col-span-2 lg:col-span-1">
              <h3 className="text-3xl font-bold font-parastoo mb-4" style={{ color: 'rgba(79,79,79,0.7)' }}>
                Sweet<span style={{ color: 'rgba(224, 99, 99, 0.85)' }}>Spot</span>
              </h3>
              <p className="font-parastoo mb-4" style={{ color: 'rgba(79,79,79,0.7)' }}>
                Crafting delicious moments since 2020. Your trusted partner for all celebration cakes and sweet treats.
              </p>
              <p className="text-sm italic font-parastoo mb-4" style={{ color: 'rgba(79,79,79,0.7)' }}>
                "Where every bite tells a sweet story"
              </p>
              <div className="flex space-x-4">
                <a href="#" className="transition-colors hover:opacity-80" 
                   style={{ color: 'rgba(224, 99, 99, 0.85)' }}>
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="transition-colors hover:opacity-80" 
                   style={{ color: 'rgba(224, 99, 99, 0.85)' }}>
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="transition-colors hover:opacity-80" 
                   style={{ color: 'rgba(224, 99, 99, 0.85)' }}>
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="transition-colors hover:opacity-80" 
                   style={{ color: 'rgba(224, 99, 99, 0.85)' }}>
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links - half width on mobile */}
            <div className="col-span-1">
              <h4 className="text-lg font-semibold font-parastoo mb-4" style={{ color: 'rgba(79,79,79,0.7)' }}>
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleNavigation('/about')}
                    className="font-parastoo transition-colors hover:opacity-80 text-left p-0 m-0 bg-transparent border-none cursor-pointer"
                    style={{ color: 'rgba(79,79,79,0.7)' }}
                  >
                    About Us
                  </button>
                </li>
                <li><a href="/cakes" className="font-parastoo transition-colors hover:opacity-80" 
                       style={{ color: 'rgba(79,79,79,0.7)' }}>Menu</a></li>
                <li><a href="/customize" className="font-parastoo transition-colors hover:opacity-80" 
                       style={{ color: 'rgba(79,79,79,0.7)' }}>Custom Orders</a></li>
                <li><a href="/contact-us" className="font-parastoo transition-colors hover:opacity-80" 
                       style={{ color: 'rgba(79,79,79,0.7)' }}>Bulk Orders</a></li>
              </ul>
            </div>

            {/* Categories - half width on mobile, paired with Quick Links */}
            <div className="col-span-1">
              <h4 className="text-lg font-semibold font-parastoo mb-4" style={{ color: 'rgba(79,79,79,0.7)' }}>
                Categories
              </h4>
              <ul className="space-y-2">
                <li><a href="/cakes" className="font-parastoo transition-colors hover:opacity-80" 
                       style={{ color: 'rgba(79,79,79,0.7)' }}>Birthday Cakes</a></li>
                <li><a href="/cakes" className="font-parastoo transition-colors hover:opacity-80" 
                       style={{ color: 'rgba(79,79,79,0.7)' }}>Wedding Cakes</a></li>
                <li><a href="/cakes" className="font-parastoo transition-colors hover:opacity-80" 
                       style={{ color: 'rgba(79,79,79,0.7)' }}>Designer Cakes</a></li>
                <li><a href="/cakes" className="font-parastoo transition-colors hover:opacity-80" 
                       style={{ color: 'rgba(79,79,79,0.7)' }}>Sugar Free</a></li>
                <li><a href="/cakes" className="font-parastoo transition-colors hover:opacity-80" 
                       style={{ color: 'rgba(79,79,79,0.7)' }}>Cupcakes</a></li>
              </ul>
            </div>

            {/* Contact Info - half width on mobile */}
            <div className="col-span-1">
              <h4 className="text-lg font-semibold font-parastoo mb-4" style={{ color: 'rgba(79,79,79,0.7)' }}>
                Contact Us
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4" style={{ color: 'rgba(224, 99, 99, 0.85)' }} />
                  <span className="font-parastoo" style={{ color: 'rgba(79,79,79,0.7)' }}>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4" style={{ color: 'rgba(224, 99, 99, 0.85)' }} />
                  <span className="font-parastoo" style={{ color: 'rgba(79,79,79,0.7)' }}>hello@sweetspot.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 mt-1" style={{ color: 'rgba(224, 99, 99, 0.85)' }} />
                  <span className="font-parastoo" style={{ color: 'rgba(79,79,79,0.7)' }}>
                    123 Sweet Street, Cake Town, 
                    <br />Mumbai - 400001
                  </span>
                </div>
              </div>
            </div>
            
            {/* Business Hours - half width on mobile, paired with Contact Info */}
            <div className="col-span-1">
              <h4 className="text-lg font-semibold font-parastoo mb-4" style={{ color: 'rgba(79,79,79,0.7)' }}>
                Business Hours
              </h4>
              <p className="text-sm font-parastoo" style={{ color: 'rgba(79,79,79,0.7)' }}>
                Mon - Sat: 9:00 AM - 10:00 PM<br />
                Sunday: 10:00 AM - 9:00 PM
              </p>
            </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-100 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm font-parastoo" style={{ color: 'rgba(79,79,79,0.7)' }}>
              © 2024 SweetSpot. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm font-parastoo transition-colors hover:opacity-80" 
                 style={{ color: 'rgba(79,79,79,0.7)' }}>Privacy Policy</a>
              <a href="#" className="text-sm font-parastoo transition-colors hover:opacity-80" 
                 style={{ color: 'rgba(79,79,79,0.7)' }}>Terms of Service</a>
              <a href="#" className="text-sm font-parastoo transition-colors hover:opacity-80" 
                 style={{ color: 'rgba(79,79,79,0.7)' }}>Refund Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;