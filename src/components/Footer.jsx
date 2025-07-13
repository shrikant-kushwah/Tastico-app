import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/T.png";
import ScrollToTopButton from "./ScrollToTopButton";

const Footer = () => {
  return (
    <footer className="bg-[#f5f5f5] py-10 px-5 sm:px-10 md:px-20 text-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-center border-b border-pink-300 pb-6 mb-10 gap-6">
        <h2 className="text-lg sm:text-xl font-semibold text-center md:text-left">
          For better experience,
          <span className="text-black"> download the Tastico app now</span>
        </h2>

        <div className="flex gap-3 sm:gap-4 flex-wrap justify-center">
          <Link to="https://play.google.com/store">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-12 sm:h-14"
            />
          </Link>
          <Link to="https://www.apple.com/in/app-store/">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="h-12 sm:h-14"
            />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-6 gap-x-2 sm:gap-x-4 md:gap-x-6 text-sm">
        <div className="col-span-2 sm:col-span-1 flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <img src={Logo} alt="Tastico Logo" className="h-10" />
            <span className="font-bold text-xl text-pink-600">TASTICO</span>
          </div>
          <p className="text-[13px] text-gray-500">© 2025 Tastico Limited</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Company</h3>
          <ul className="space-y-1 text-[13px] text-gray-600">
            <li><Link to="#">About Us</Link></li>
            <li><Link to="#">Tastico Corporate</Link></li>
            <li><Link to="#">Careers</Link></li>
            <li><Link to="#">Team</Link></li>
            <li><Link to="#">Tastico One</Link></li>
            <li><Link to="#">Tastico Instamart</Link></li>
            <li><Link to="#">Tastico Dineout</Link></li>
            <li><Link to="#">Tastico Genie</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Contact us</h3>
          <ul className="space-y-1 text-[13px] text-gray-600">
            <li><Link to="#">Help & Support</Link></li>
            <li><Link to="#">Partner with us</Link></li>
            <li><Link to="#">Ride with us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Available in</h3>
          <ul className="space-y-1 text-[13px] text-gray-600">
            <li><Link to="#">Bangalore</Link></li>
            <li><Link to="#">Gurgaon</Link></li>
            <li><Link to="#">Hyderabad</Link></li>
            <li><Link to="#">Delhi</Link></li>
            <li><Link to="#">Mumbai</Link></li>
            <li><Link to="#">Pune</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Life at Tastico</h3>
          <ul className="space-y-1 text-[13px] text-gray-600">
            <li><Link to="#">Explore with Tastico</Link></li>
            <li><Link to="#">Tastico News</Link></li>
            <li><Link to="#">Snackables</Link></li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-10 gap-4 sm:gap-6 text-sm">
        <div>
          <h3 className="font-semibold mb-1">Legal</h3>
          <p className="text-[13px] text-gray-600"><Link to="#">Terms & Conditions</Link></p>
          <p className="text-[13px] text-gray-600"><Link to="#">Cookie Policy</Link></p>
        </div>

        <div className="text-center sm:text-right">
          <h3 className="font-semibold mb-1">Social Links</h3>
          <div className="flex justify-center sm:justify-end gap-4 text-lg text-gray-600">
            <Link to="#"><i className="fab fa-linkedin hover:text-[#0A66C2]"></i></Link>
            <Link to="#"><i className="fab fa-instagram hover:text-[#E1306C]"></i></Link>
            <Link to="#"><i className="fab fa-facebook hover:text-[#1877F2]"></i></Link>
            <Link to="#"><i className="fab fa-pinterest hover:text-[#BD081C]"></i></Link>
            <Link to="#"><i className="fab fa-twitter hover:text-[#1DA1F2]"></i></Link>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </footer>
  );
};

export default Footer;
