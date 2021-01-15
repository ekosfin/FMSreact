import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles.css";
import { eng } from '../languages/en.js';
import { fin } from '../languages/fi.js';


export default function Settings(props) {
    const history = useHistory();
    const [language, setComponentLanguage] = useState(()  => getLangFromProp());

    function getLangFromProp(){
        if(props.language==="eng"){
            return eng;
        }else if(props.language==="fin"){
            return fin;
        } 
    }

    function engSelected(){
        if(language===eng){
            return "textOnlyButtonSelect"
        }else{
            return "textOnlyButton"
        }
      }
    
      function finSelected(){
          if(language===fin){
              return "textOnlyButtonSelect"
          }else{
              return "textOnlyButton"
          }
      }

    function onEngClick(){
        props.setLanguage("eng");
        updateComponentLanguage(eng);
    }
    
    function onFinClick(){
        props.setLanguage("fin");
        updateComponentLanguage(fin);
    }

    function onSaveClick(){
    }

    function onDeleteUserClick(){
    }

    function updateComponentLanguage(e){
        setComponentLanguage(e);
    }

    return (
        <div className="Settings">

            <p className="pageTitle" id="pageTitleWithPadding">{language.settings}</p>
            <div className="settingsDivider">
                <p className="normalLeftText">{language.username}</p>
                <input
                    type="text"
                    className="settingInfoInput"
                />
            </div>
            <div className="settingsDivider">
                <p className="normalLeftText">{language.newPassword}</p>
                <input
                    type="text"
                    className="settingInfoInput"
                />
                <p className="normalLeftText">{language.newPwAgain}</p>
                <input
                    type="text"
                    className="settingInfoInput"
                />
            </div>
            <div className="settingsDivider">
                <p className="normalLeftText">{language.email}</p>
                <input
                    type="text"
                    className="settingInfoInput"
                />
            </div>
            <div className="settingsDivider" id="settingsBottomPadding">
                <p className="normalLeftText">{language.language}</p>
                <div className="settingsLanguageDiv">
                    <button className={engSelected()} onClick={onEngClick}>
                        {language.enLang}
                    </button>
                    <button className={finSelected()} onClick={onFinClick}>
                        {language.fiLang}
                    </button>
                </div>
            </div>
            <div className="settingsDivider" id="settingsbottomDiv">
                <p className="normalLeftText">{language.currentPw}</p>
                <input
                    type="text"
                    className="settingInfoInput"
                />
                <button className="normalButton" id="settingsSave" onClick={onSaveClick}>
                    {language.save}
                </button>
                <button className="normalButton" id="settingsDelete" onClick={onDeleteUserClick}>
                    {language.deleteUser}
                </button>
            </div>
        </div>
    );
}