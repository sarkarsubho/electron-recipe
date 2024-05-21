import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from './AuthContext.jsx'

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  console.log(auth)
  if (auth !== null) {
    return children;
  }

  return <Navigate to={"/login"}></Navigate>;
};

export default PrivateRoute;
