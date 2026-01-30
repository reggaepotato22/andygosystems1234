import React, { createContext, useContext, useState, useCallback } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  triggerLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const triggerLoading = useCallback(() => {
    setIsLoading(true);
    // Reset after animation completes (approx 800ms)
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, triggerLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
