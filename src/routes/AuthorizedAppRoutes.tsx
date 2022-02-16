import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Main } from "@/features/authorizedApp";
import { Project } from "@/features/authorizedApp/features/Project";

export const UnauthorizedAppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="projects/:projectId" element={<Project />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
