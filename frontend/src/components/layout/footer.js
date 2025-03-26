import { FaTwitter, FaFacebookF, FaYoutube, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white mt-10 pt-10">
      <div className="container mx-auto px-5 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div>
            <h1 className="text-3xl font-bold text-primary mb-4">F<span className="text-secondary">oo</span>dy</h1>
            <p className="text-gray-400">Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary"><FaTwitter /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary"><FaFacebookF /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary"><FaYoutube /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Address</h4>
            <p className="flex items-center"><FaMapMarkerAlt className="mr-2" /> 123 Street, New York, USA</p>
            <p className="flex items-center"><FaPhoneAlt className="mr-2" /> +012 345 67890</p>
            <p className="flex items-center"><FaEnvelope className="mr-2" /> info@example.com</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-500 hover:text-white transition-colors duration-200">About Us</a></li>
              <li><a href="/contact" className="text-gray-500 hover:text-white transition-colors duration-200">Contact Us</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors duration-200">Our Services</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors duration-200">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors duration-200">Support</a></li>
            </ul>
          </div>


          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400">Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
            <div className="relative mt-4">
              <input type="text" placeholder="Your email" className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none" />
              <button className="absolute top-1 right-1 bg-primary px-4 py-2 text-white rounded hover:bg-secondary">Sign Up</button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-800 py-4 text-center text-gray-400">
        &copy; 2024 <a href="#" className="text-primary">Your Site Name</a>. All Rights Reserved.
        <br /> Designed by <a href="https://htmlcodex.com" className="text-primary">HTML Codex</a> | Distributed by <a href="https://themewagon.com" className="text-primary">ThemeWagon</a>
      </div>
    </div>
  );
};

export default Footer;
