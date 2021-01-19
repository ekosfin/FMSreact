import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles.css";
import { eng } from '../languages/en.js';
import { fin } from '../languages/fi.js';


export default function NewTask(props) {
    const history = useHistory();
    const [language, setComponentLanguage] = useState(()  => getLangFromProp());

    function getLangFromProp(){
        if(props.language==="eng"){
            return eng;
        }else if(props.language==="fin"){
            return fin;
        } 
    }

    //UseEffect Check user has permission to be here, token
    //Request to back to make a task

    return (
        <div className="NewTask">
            New task
        </div>
    );
}