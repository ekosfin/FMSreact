import React from "react";
import TopBar from "../TopBar";
import Home from "../Home";
import BottomBar from "../BottomBar";
import { useLanguage } from "../contexts/LanguageContext";

export default function HomeRoute() {
  const { language } = useLanguage();
  return (
    <>
      <TopBar language={language} />
      <Home language={language} />
      <BottomBar location="home" />
    </>
  );
}
