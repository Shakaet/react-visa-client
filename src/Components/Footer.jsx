import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Website Information */}
          <div>
            <h2 className="text-xl font-bold">My Awesome Site</h2>
            <p className="mt-2 text-gray-400">
              Your trusted platform for navigating visa applications.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-bold">Contact Us</h2>
            <ul className="mt-2 space-y-1">
              <li className="text-gray-400">Email: support@myawesomesite.com</li>
              <li className="text-gray-400">Phone: +1 234 567 890</li>
              <li className="text-gray-400">Address: 123 Visa St, Global City</li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h2 className="text-xl font-bold">Thank you For Visiting my Website</h2>
            <div className="flex mt-2 space-x-4">
              {/* <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <i className="fab fa-linkedin-in"></i>
              </a> */}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 text-center border-t border-gray-700 pt-4">
          <p className="text-gray-400">
            © {new Date().getFullYear()} My Awesome Site. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
