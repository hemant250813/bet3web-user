import React from "react";

const Footer = (loading, setLoading) => {
  return (
    <>
      {!loading && (
        <footer className="bg-gray-800 text-white p-4">
          <p className="text-center">Your Footer</p>
        </footer>
      )}
    </>
  );
};

export default Footer;
