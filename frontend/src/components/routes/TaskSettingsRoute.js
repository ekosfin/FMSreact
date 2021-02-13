import React from 'react';
import TopBar from '../TopBar';
import Settings from '../TaskSettings';
import BottomBar from '../BottomBar';
import {useLanguage} from '../contexts/LanguageContext';

export default function TaskSettingsRoute() {
  const {language} = useLanguage();
  return (
    <>
      <TopBar language={language} />
      <Settings language={language} />
      <BottomBar location="settings" />
    </>
  );
}
