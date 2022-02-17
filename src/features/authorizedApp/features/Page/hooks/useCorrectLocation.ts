import { UseQueryResult } from "react-query";
import { useNavigate } from "react-router-dom";

export function useCorrectLocation(itemQuery: UseQueryResult<{ id: string }>) {
  const navigate = useNavigate();
  if (!itemQuery.data) return;

  const { pathname } = location;
  if (!location.pathname.endsWith(itemQuery.data.id)) {
    const newUrl = pathname.replace(/\/\w+$/, `/${itemQuery.data.id}`);
    navigate(newUrl, { replace: true });
  }
}
