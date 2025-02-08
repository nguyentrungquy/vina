import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function useSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsObject = useMemo(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);


  return [paramsObject, setSearchParams];
}
