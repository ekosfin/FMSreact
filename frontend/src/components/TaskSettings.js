import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles.css";
import { eng } from '../languages/en.js';
import { fin } from '../languages/fi.js';


export default function TaskSettings(props) {
    const history = useHistory();
    const [language, setComponentLanguage] = useState(()  => getLangFromProp());
    const [notifTime, setNotifTime] = useState("");
    const [notifTimeType, setNotifTimeType] = useState("");

    function getLangFromProp(){
        if(props.language==="eng"){
            return eng;
        }else if(props.language==="fin"){
            return fin;
        } 
    }

    function onUserTabClick(){
        history.push("/settings");
    }

    function onSaveTimeClick(){
    }

    function updateNotifTimeState(e) {
        setNotifTime(e.target.value);
    } 

    function updateNotifTimeTypeState(e) {
        setNotifTimeType(e.target.value);
    }

    return (
        <div className="TaskSettings">
            <div className="topDiv">
                <p className="pageTitle" id="pageTitleWithPadding">{language.settings}</p>
                <div className="tabDiv">
                    <button className={"textOnlyButton"} onClick={onUserTabClick}>
                        {language.userTab}
                    </button>
                    <button className={"textOnlyButtonSelect"}>
                        {language.taskTab}
                    </button>
                </div>
            </div>
            <p className="normalLeftText">{language.emailNotif}</p>
            <p className="normalLeftText">{language.currNotifs}</p>
        </div>
    );
}