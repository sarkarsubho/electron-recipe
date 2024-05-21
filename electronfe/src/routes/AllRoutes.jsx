import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../context/PrivateRoute";
import Recipes from "../pages/Recipes";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Recipes />
          </PrivateRoute>
        }
      ></Route>
         <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
    </Routes>
  );
};

export default AllRoutes;
