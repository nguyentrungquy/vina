import * as React from "react";

export interface IuseDebounceProps {
  value: any;
  delay?: number;
}

export default function useDebounce({ value, delay = 500 }: IuseDebounceProps) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
