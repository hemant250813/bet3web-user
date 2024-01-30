// // ProtectedRoute.js
// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// const ProtectedRoute = ({ component: Component, isAuthorized, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthorized ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/unauthorized" />
//         )
//       }
//     />
//   );
// };

// export default ProtectedRoute;
