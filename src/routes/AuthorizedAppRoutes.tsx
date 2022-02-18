import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Main } from "@/features/authorizedApp";
import { Label } from "@/features/authorizedApp/features/Page/features/Label";
import { Project } from "@/features/authorizedApp/features/Page/features/Project";

export const UnauthorizedAppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="projects/:projectId" element={<Project />} />
        <Route path="labels/:labelId" element={<Label />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
