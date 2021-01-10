import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles.css";
import { eng } from '../languages/en.js'
import { fin } from '../languages/fi.js'


export default function Register(props) {
  const history = useHistory();
  const [language, setComponentLanguage] = useState(()  => getLangFromProp());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  function getLangFromProp(){
    if(props.language==="eng"){
        return eng;
    }else if(props.language==="fin"){
        return fin;
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

  function onRegisterClick(){
        
  }

  function engSelected(){
    if(language===eng){
        return "languageButtonSelect"
    }else{
        return "languageButton"
    }
  }

  function finSelected(){
      if(language===fin){
          return "languageButtonSelect"
      }else{
          return "languageButton"
      }
  }

  function updateComponentLanguage(e){
    setComponentLanguage(e);
  }

  function updateEmailState(e) {
    setEmail(e.target.value);
  }

  function updatePasswordState(e) {
    setPassword(e.target.value);
  }

  function updateUsernameState(e) {
    setUsername(e.target.value);
  }

  

  return (
    <div className="Register">
      <div className="languageDiv">
        <button className={engSelected()} onClick={onEngClick}>
          {language.enLang}
        </button>
        <button className={finSelected()} onClick={onFinClick}>
          {language.fiLang}
        </button>
      </div>
      <p className="titleText">{language.title}</p>
      <p className="highlightText">{language.registerExplanation}</p>
      <div id="registerInfoWrapper">
        <div className="registerInfoDiv">
          <p className="normalText">{(language.email+"*")}</p>
          <input
            type="text"
            className="infoInput"
            value={email}
            onChange={updateEmailState}
          />
          <p className="normalText">{(language.password+"*")}</p>
          <input
            type="text"
            className="infoInput"
            value={password}
            onChange={updatePasswordState}
          />
          <p className="normalText">{language.username}</p>
          <input
            type="text"
            className="infoInput"
            value={username}
            onChange={updateUsernameState}
          />
          <p className="smallHighlightText">{language.starEqualsRequired}</p>
        </div>
      </div>
      <button className="normalButton" id="registerButton" onClick={onRegisterClick}>
        {language.registerNow}
      </button>
    </div>
  );
}