import { Login, PasswordRecovery, SignUp } from "features/unauthorizedApp";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const UnauthorizedAppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/password-recovery" element={<PasswordRecovery />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default UnauthorizedAppRoutes;
