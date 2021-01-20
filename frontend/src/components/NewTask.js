import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles.css";
import { eng } from '../languages/en.js';
import { fin } from '../languages/fi.js';


export default function NewTask(props) {
    const history = useHistory();
    const [language, setComponentLanguage] = useState(()  => getLangFromProp());
    const [taskName, setTaskName] = useState("");

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
    
    function updateTaskNameState(e) {
        setTaskName(e.target.value);
    }

    return (
        <div className="NewTask">
            <p className="pageTitle">{language.newTask}</p>
            <div className="settingsDivider">
                <p className="normalLeftText">{language.taskName}</p>
                <input
                    type="text"
                    className="settingInfoInput"
                    value={taskName}
                    onChange={updateTaskNameState}
                />
            </div>
            <div className="homeButtonWrapper">
                <button className="normalButton" id="homeNewTaskButton" onClick={onNewTaskClick}>
                    {language.createTask}
                </button>
            </div>
        </div>
    );
}