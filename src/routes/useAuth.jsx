// // useAuth.js

// import { useState, useEffect } from 'react';

// const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     // You might have authentication logic here (e.g., check if the user is logged in)
//     // For simplicity, let's assume authentication status is stored in localStorage

//     const storedAuthStatus = localStorage.getItem('isAuthenticated');
//     setIsAuthenticated(storedAuthStatus === 'true');
//   }, []);

//   const login = () => {
//     // You would typically call an authentication API here and update the state accordingly
//     localStorage.setItem('isAuthenticated', 'true');
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     // You would typically call a logout API here and update the state accordingly
//     localStorage.setItem('isAuthenticated', 'false');
//     setIsAuthenticated(false);
//   };

//   return {
//     isAuthenticated,
//     login,
//     logout,
//   };
// };

// export default useAuth;
