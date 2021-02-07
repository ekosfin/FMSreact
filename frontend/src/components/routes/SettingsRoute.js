import React from "react";
import TopBar from "../TopBar";
import Settings from "../Settings";
import BottomBar from "../BottomBar";
import { useLanguage } from "../contexts/LanguageContext";

export default function SettingsRoute() {
  const { language, updateLanguage } = useLanguage();
  return (
    <>
      <TopBar language={language} />
      <Settings language={language} setLanguage={updateLanguage} />
      <BottomBar location="settings" />
    </>
  );
}
