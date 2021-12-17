import { Main } from "features/authorizedApp";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const UnauthorizedAppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default UnauthorizedAppRoutes;
