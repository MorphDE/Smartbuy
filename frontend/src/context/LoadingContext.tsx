import { createContext } from "react";

interface LoadingContextType {
    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;
  }

export const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setLoading: () => ''
});
