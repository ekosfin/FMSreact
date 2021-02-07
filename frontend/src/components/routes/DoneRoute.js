import React from "react";
import TopBar from "../TopBar";
import DoneTasks from "../DoneTasks";
import BottomBar from "../BottomBar";
import { useLanguage } from "../contexts/LanguageContext";

export default function DoneRoute() {
  const { language, updateTaskTitle } = useLanguage();
  return (
    <>
      <TopBar language={language} />
      <DoneTasks language={language} setTaskTitle={updateTaskTitle} />
      <BottomBar location="done" />
    </>
  );
}
