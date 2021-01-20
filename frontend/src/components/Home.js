import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles.css";
import { eng } from '../languages/en.js';
import { fin } from '../languages/fi.js';


export default function Home(props) {
    const history = useHistory();
    const [language, setComponentLanguage] = useState(()  => getLangFromProp());
    const [tasksList, setTasksList] = useState(["first", "second", "third"]);

    function getLangFromProp(){
        if(props.language==="eng"){
            return eng;
        }else if(props.language==="fin"){
            return fin;
        } 
    }

    function onNewTaskClick(){
        history.push("/newTask");
    }

    function updateTasksState(e) {
        setTasksList(e);
    }

    return (
        <div className="Home">
            <p className="smallText">{"The username"}</p>
            <p className="pageTitle">{language.todo}</p>
            <div className="todoList">
                {tasksList.map((item) => (
                    <p key={item} className="task">
                        {item}
                    </p>
                ))}
            </div>
            <div className="homeButtonWrapper">
                <button className="normalButton" id="homeNewTaskButton" onClick={onNewTaskClick}>
                    {language.addNewTask}
                </button>
            </div>
        </div>
    );
}