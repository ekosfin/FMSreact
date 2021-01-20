import React, { useState} from "react";
import { useHistory } from "react-router-dom";
import "../styles.css";
import { eng } from '../languages/en.js';
import { fin } from '../languages/fi.js';


export default function DoneTasks(props) {
    const [language, setComponentLanguage] = useState(()  => getLangFromProp());
    const [tasksList, setTasksList] = useState(["first", "second", "third"]);

    function getLangFromProp(){
        if(props.language==="eng"){
            return eng;
        }else if(props.language==="fin"){
            return fin;
        } 
    }

    function updateTasksState(e) {
        setTasksList(e);
    }

    return (
        <div className="DoneTasks">
            <p className="pageTitle">{language.doneTasks}</p>
            <div className="todoList" id="completeList">
                {tasksList.map((item) => (
                    <p key={item} className="task">
                        {item}
                    </p>
                ))}
            </div>
        </div>
    );
}