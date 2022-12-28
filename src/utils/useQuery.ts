import { useLocation } from "react-router-dom";

export default function useQuery(queryName: string) {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const foundQuery = query.get(queryName);

  return foundQuery;
}
