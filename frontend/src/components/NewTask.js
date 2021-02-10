import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import '../styles.css';
import {eng} from '../languages/en.js';
import {fin} from '../languages/fi.js';
import DatePicker, {registerLocale, setDefaultLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fi from 'date-fns/locale/fi';
registerLocale('fi', fi);

export default function NewTask(props) {
  const history = useHistory();
  const [language, setComponentLanguage] = useState(() => getLangFromProp());
  const taskTitle = props.taskTitle;
  const [taskName, setTaskName] = useState(taskTitle);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  function getLangFromProp() {
    if (props.language === 'eng') {
      return eng;
    } else if (props.language === 'fin') {
      return fin;
    }
  }

  useEffect(() => {
    props.setTaskTitle('');
  }, []);

  async function onCreateTaskClick() {
    const bodyData = {
      title: taskName,
      endDate: endDate,
      startDate: startDate,
      date: startDate,
    };

    await fetch('http://localhost:5000/newtask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('@token'),
      },
      body: JSON.stringify(bodyData),
    });

    history.push('/home');
  }

  function updateTaskNameState(e) {
    setTaskName(e.target.value);
  }

  return (
    <div className="NewTask">
      <p className="pageTitle">{language.newTask}</p>
      <div className="settingsDivider">
        <p className="normalText">{language.taskName}</p>
        <input
          type="text"
          className="settingInfoInput"
          value={taskName}
          onChange={updateTaskNameState}
        />
      </div>
      <div className="newTaskDateDivider">
        <p className="normalText">{language.taskStartDate}</p>
        <DatePicker
          className="newTaskDatePicker"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          locale="fi"
          showTimeSelect
          dateFormat="dd.MM.yyyy HH:mm"
        />
        <p className="normalText">{language.taskEndDate}</p>
        <DatePicker
          className="newTaskDatePicker"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          locale="fi"
          showTimeSelect
          dateFormat="dd.MM.yyyy HH:mm"
        />
      </div>
      <div className="homeButtonWrapper">
        <button
          className="normalButton"
          id="homeNewTaskButton"
          onClick={onCreateTaskClick}
        >
          {language.createTask}
        </button>
      </div>
    </div>
  );
}
