import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import '../styles.css';
import {eng} from '../languages/en.js';
import {fin} from '../languages/fi.js';
import CheckIcon from '@material-ui/icons/Check';
import ToggleButton from '@material-ui/lab/ToggleButton';

export default function TaskSettings(props) {
  const history = useHistory();
  const [language, setComponentLanguage] = useState(() => getLangFromProp());
  const [notifTime, setNotifTime] = useState('');
  const [notifTimeType, setNotifTimeType] = useState('');
  const [tasksList, setTasksList] = useState(['first', 'second', 'third']);

  function getLangFromProp() {
    if (props.language === 'eng') {
      return eng;
    } else if (props.language === 'fin') {
      return fin;
    }
  }

  function onUserTabClick() {
    history.push('/settings');
  }

  function onRemoveAllNotifsClick() {}

  function updateNotifTimeState(e) {
    setNotifTime(e.target.value);
  }

  function updateNotifTimeTypeState(e) {
    setNotifTimeType(e.target.value);
  }

  function updateTasksState(e) {
    setTasksList(e);
  }

  return (
    <div className="TaskSettings">
      <div className="topDiv">
        <p className="pageTitle" id="pageTitleWithPadding">
          {language.settings}
        </p>
        <div className="tabDiv">
          <button className={'textOnlyButton'} onClick={onUserTabClick}>
            {language.userTab}
          </button>
          <button className={'textOnlyButtonSelect'}>{language.taskTab}</button>
        </div>
      </div>
      <p className="normalLeftText">{language.emailNotif}</p>
      <ToggleButton value="check">
        <CheckIcon className="checkToggle" />
      </ToggleButton>
      <p className="normalLeftText">{language.currNotifs}</p>
      <div className="notifList">
        {tasksList.map((item) => (
          <div key={item} className="notif">
            {item}
          </div>
        ))}
      </div>
      <div className="homeButtonWrapper">
        <button
          className="normalButton"
          id="removeAllNotifsButton"
          onClick={onRemoveAllNotifsClick}
        >
          {language.removeAllNotifs}
        </button>
      </div>
    </div>
  );
}
