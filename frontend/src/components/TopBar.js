import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import LockIcon from '@material-ui/icons/Lock';
import "../styles.css";
import { eng } from '../languages/en.js';
import { fin } from '../languages/fi.js';


export default function TopBar(props) {
    const history = useHistory();
    const [language, setComponentLanguage] = useState(()  => getLangFromProp());

    function getLangFromProp(){
        if(props.language==="eng"){
            return eng;
        }else if(props.language==="fin"){
            return fin;
        } 
    }

    function onLogoutClick(){
        history.push("/");
    }

    return (
        <div className="TopBar">
           <p className="titleTextTopBar">{language.title}</p>
            <IconButton id="topLogoutButton" onClick={onLogoutClick}>
                <LockIcon fontSize="large"/>
            </IconButton>
        </div>
    );
}