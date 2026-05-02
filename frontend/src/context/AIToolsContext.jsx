import React, { createContext, useContext, useState } from 'react';

const AIToolsContext = createContext();

export const useAITools = () => {
  const context = useContext(AIToolsContext);
  if (!context) {
    throw new Error('useAITools must be used within AIToolsProvider');
  }
  return context;
};

export const AIToolsProvider = ({ children }) => {
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedResume, setUploadedResume] = useState(null);

  const addToHistory = (analysis) => {
    setAnalysisHistory(prev => [analysis, ...prev].slice(0, 50)); // Keep last 50
  };

  const clearHistory = () => {
    setAnalysisHistory([]);
  };

  const value = {
    analysisHistory,
    currentAnalysis,
    loading,
    uploadedResume,
    setAnalysisHistory,
    setCurrentAnalysis,
    setLoading,
    setUploadedResume,
    addToHistory,
    clearHistory
  };

  return (
    <AIToolsContext.Provider value={value}>
      {children}
    </AIToolsContext.Provider>
  );
};
