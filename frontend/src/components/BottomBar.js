import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import DoneIcon from '@material-ui/icons/Done';
import SettingsIcon from '@material-ui/icons/Settings';
import LockIcon from '@material-ui/icons/Lock';
import "../styles.css";


export default function BottomBar(props) {
    const history = useHistory();

    function onHomeClick(){
        history.push("/home");
    }

    function onDoneClick(){
        history.push("/done");
    }

    function onSettingsClick(){
        history.push("/settings");
    }

    function onLogoutClick(){
        history.push("/");
    }

    return (
        <div className="BottomBar">
            <IconButton id="footerHomeButton" onClick={onHomeClick}>
                <HomeIcon fontSize="large"/>
            </IconButton>
            <IconButton id="footerDoneButton" onClick={onDoneClick}>
                <DoneIcon fontSize="large"/>
            </IconButton>
            <IconButton id="footerSettingsButton" onClick={onSettingsClick}>
                <SettingsIcon fontSize="large"/>
            </IconButton>
            <IconButton id="footerLogoutButton" onClick={onLogoutClick}>
                <LockIcon fontSize="large"/>
            </IconButton>
        </div>
    );
}