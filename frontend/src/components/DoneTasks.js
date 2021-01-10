import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles.css";
import { eng } from '../languages/en.js';
import { fin } from '../languages/fi.js';


export default function DoneTasks(props) {
    const history = useHistory();
    const [language, setComponentLanguage] = useState(()  => getLangFromProp());

    function getLangFromProp(){
        if(props.language==="eng"){
            return eng;
        }else if(props.language==="fin"){
            return fin;
        } 
    }

    return (
        <div className="DoneTasks">
            Done Tasks
        </div>
    );
}