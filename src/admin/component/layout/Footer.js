import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-[#4fd1c5] p-4">
    <div className="container mx-auto flex items-center justify-between">
      <div>
        {/* Add your copyright information */}
        <p>&copy; 2023 Your Company Name. All rights reserved.</p>
      </div>
      <div>
        {/* Add any other content you want in the footer */}
        <p>Contact Us | Privacy Policy</p>
      </div>
    </div>
  </div>
  );
};

export default Footer;
