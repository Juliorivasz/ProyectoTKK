// src/routes/AuthRoutes.js

import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../containets/pages/Login";


const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
    </Routes>
  );
};

export default AuthRoutes;
