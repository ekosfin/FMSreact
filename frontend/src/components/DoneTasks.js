import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles.css";
import { eng } from "../languages/en.js";
import { fin } from "../languages/fi.js";
import Task from "./DoneTask";

export default function DoneTasks(props) {
  const [language, setComponentLanguage] = useState(() => getLangFromProp());
  const [tasksList, setTasksList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchTasks();
  }, []);

  function fetchTasks() {
    fetch("http://localhost:5000/donetasks", {
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

  function toNewTask() {
    history.push("/newTask");
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
