import React, { useContext, useState } from "react";

const LanguageContext = React.createContext();

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("eng");
  const [taskTitle, setTaskTitle] = useState("");

  function updateLanguage(e) {
    setLanguage(e);
  }

  function updateTaskTitle(e) {
    setTaskTitle(e);
  }

  const value = {
    language,
    taskTitle,
    updateLanguage,
    updateTaskTitle,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
