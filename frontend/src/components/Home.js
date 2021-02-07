import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles.css";
import { eng } from "../languages/en.js";
import { fin } from "../languages/fi.js";
import Task from "./Task";
import { useAuth } from "./contexts/AuthContext";

export default function Home(props) {
  const history = useHistory();
  const [language, setComponentLanguage] = useState(() => getLangFromProp());
  const [tasksList, setTasksList] = useState([]);
  const { currentUser } = useAuth();
  const user = currentUser.displayName;

  useEffect(() => {
    fetchTasks();
  }, []);

  function fetchTasks() {
    fetch("http://localhost:5000/gettasks", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("@token"),
      },
    })
      .then((res) => res.json())
      .then((data) =>
        setTasksList(
          data.map((task) => ({ ...task, date: new Date(task.date) }))
        )
      );
  }

  function getLangFromProp() {
    if (props.language === "eng") {
      return eng;
    } else if (props.language === "fin") {
      return fin;
    }
  }

  function onNewTaskClick() {
    history.push("/newTask");
  }

  function updateTasksState(e) {
    setTasksList(e);
  }

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
      <div className="todoList">
        {tasksList.map((item) => (
          <Task
            key={item._id}
            id={item._id}
            title={item.title}
            date={item.date}
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
