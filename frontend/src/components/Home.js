import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import '../styles.css';
import {eng} from '../languages/en.js';
import {fin} from '../languages/fi.js';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Task from './Task';
import {useAuth} from './contexts/AuthContext';

export default function Home(props) {
  const history = useHistory();
  const [language, setComponentLanguage] = useState(() => getLangFromProp());
  const [tasksList, setTasksList] = useState([]);
  const {currentUser, jwtToken} = useAuth();
  const user = currentUser.displayName;
  const [anchorEl, setAnchorEl] = useState(null);

  function fetchTasks() {
    fetch('http://localhost:5000/gettasks', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + jwtToken,
      },
    })
      .then((res) => res.json())
      .then((data) =>
        setTasksList(data.map((task) => ({...task, date: new Date(task.date)})))
      );
  }

  useEffect(() => {
    if (jwtToken === '') return;
    fetchTasks();
  }, [jwtToken]);

  function getLangFromProp() {
    if (props.language === 'eng') {
      return eng;
    } else if (props.language === 'fin') {
      return fin;
    }
  }

  function compareEndDates(a, b) {
    if (a.endDate < b.endDate) {
      return -1;
    }
    if (a.endDate > b.lendDate) {
      return 1;
    }
    return 0;
  }

  function compareTitles(a, b) {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  }

  function endDateSort() {
    let tasks = [...tasksList];
    tasks.sort(compareEndDates);
    updateTasksState(tasks);
  }

  function alphabetSort() {
    let tasks = [...tasksList];
    tasks.sort(compareTitles);
    updateTasksState(tasks);
  }

  function onNewTaskClick() {
    history.push('/newTask');
  }

  function updateTasksState(e) {
    setTasksList(e);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onAlphabetSortClick = () => {
    alphabetSort();
    setAnchorEl(null);
  };

  const onEndDateSortClick = () => {
    endDateSort();
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="Home">
      <div className="leftRightDisplayDiv">
        <p className="pageTitle">{language.todo}</p>
        <p className="smallTextInline" id="homeInlineLoggedIn">
          {language.loggedInAs}
        </p>
      </div>
      <p className="smallText" id="homeUsername">
        {user}
      </p>
      <div className="rightDisplayDiv">
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {language.sort}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={onEndDateSortClick}>
            {language.endingDate}
          </MenuItem>
          <MenuItem onClick={onAlphabetSortClick}>{language.byTitle}</MenuItem>
        </Menu>
      </div>
      <div className="todoList">
        {tasksList.map((item) => (
          <Task
            key={item._id}
            id={item._id}
            title={item.title}
            endDate={item.endDate}
            lang={language}
            onRemoved={fetchTasks}
          />
        ))}
      </div>
      <div className="homeButtonWrapper">
        <button
          className="normalButton"
          id="homeNewTaskButton"
          onClick={onNewTaskClick}
        >
          {language.addNewTask}
        </button>
      </div>
    </div>
  );
}
