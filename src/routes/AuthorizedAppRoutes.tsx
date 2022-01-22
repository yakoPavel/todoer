import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Main } from "@/features/authorizedApp";

export const UnauthorizedAppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
