import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LoginPage";

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={"Home"} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
    </Routes>
);

export default AppRoutes;
