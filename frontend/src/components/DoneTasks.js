import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import '../styles.css';
import {eng} from '../languages/en.js';
import {fin} from '../languages/fi.js';
import Task from './DoneTask';
import jwt_decode from 'jwt-decode';

export default function DoneTasks(props) {
  const [language, setComponentLanguage] = useState(() => getLangFromProp());
  const [tasksList, setTasksList] = useState([]);
  const user = jwt_decode(localStorage.getItem('accessToken'));
  const history = useHistory();

  useEffect(() => {
    fetchTasks();
  }, []);

  function fetchTasks() {
    //Change to GetDoneTask when back is ready
    fetch('http://localhost:5000/gettasks', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    })
      .then((res) => res.json())
      .then((data) =>
        setTasksList(data.map((task) => ({...task, date: new Date(task.date)})))
      );
  }

  function getLangFromProp() {
    if (props.language === 'eng') {
      return eng;
    } else if (props.language === 'fin') {
      return fin;
    }
  }

  function toNewTask() {
    history.push('/newTask');
  }

  function updateTasksState(e) {
    setTasksList(e);
  }

  return (
    <div className="DoneTasks">
      <p className="pageTitle">{language.doneTasks}</p>
      <div className="todoList" id="completeList">
        {tasksList.map((item) => (
          <Task
            key={item._id}
            id={item._id}
            title={item.title}
            date={item.date}
            lang={language}
            onRemoved={fetchTasks}
            setTaskTitle={props.setTaskTitle}
            goToNewTask={toNewTask}
          />
        ))}
      </div>
    </div>
  );
}
