import React, { useState, useEffect } from "react";

const LoaderButton = () => {
  return (
    <svg
      className="animate-spin h-10 w-10 mr-3 mt-1 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4zm10-1.662c-3.314 0-6-2.686-6-6h-4c0 4.418 3.582 8 8 8v-2.038zM16.623 6.377c.781 1.456 1.254 3.132 1.377 4.905h2.036c-.171-2.283-.929-4.378-2.413-5.882l-1 1.977z"
      ></path>
    </svg>
  );
};

export default LoaderButton;
