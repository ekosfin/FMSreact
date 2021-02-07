import React from "react";
import TopBar from "../TopBar";
import NewTask from "../NewTask";
import BottomBar from "../BottomBar";
import { useLanguage } from "../contexts/LanguageContext";

export default function NewTaskRoute() {
  const { language, taskTitle, updateTaskTitle } = useLanguage();
  return (
    <>
      <TopBar language={language} />
      <NewTask
        language={language}
        taskTitle={taskTitle}
        setTaskTitle={updateTaskTitle}
      />
      <BottomBar location="settings" />
    </>
  );
}
