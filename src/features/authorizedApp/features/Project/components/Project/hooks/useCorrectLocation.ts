import { UseQueryResult } from "react-query";
import { useNavigate } from "react-router-dom";

import { Project as ProjectData } from "@/features/authorizedApp/types";

export function useCorrectLocation(projectQuery: UseQueryResult<ProjectData>) {
  const navigate = useNavigate();
  if (!projectQuery.data) return;

  if (!location.pathname.endsWith(projectQuery.data.id)) {
    navigate(`/projects/${projectQuery.data.id}`, { replace: true });
  }
}
