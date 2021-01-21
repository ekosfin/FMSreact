import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles.css";
import { eng } from "../languages/en.js";
import { fin } from "../languages/fi.js";

export default function Login(props) {
  const history = useHistory();
  const [language, setComponentLanguage] = useState(() => getLangFromProp());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function getLangFromProp() {
    if (props.language === "eng") {
      return eng;
    } else if (props.language === "fin") {
      return fin;
    }
  }

  function onEngClick() {
    props.setLanguage("eng");
    updateComponentLanguage(eng);
  }

  function onFinClick() {
    props.setLanguage("fin");
    updateComponentLanguage(fin);
  }

  function onLoginClick() {
    const bodyData = {
      username: username,
      password: password,
    };
    fetch("http://localhost:4000/login", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        if (data.message === "Login successful") {
          history.push("/home");
        }
      });
  }

  function onRegisterClick() {
    history.push("/register");
  }

  function engSelected() {
    if (language === eng) {
      return "textOnlyButtonSelect";
    } else {
      return "textOnlyButton";
    }
  }

  function finSelected() {
    if (language === fin) {
      return "textOnlyButtonSelect";
    } else {
      return "textOnlyButton";
    }
  }

  function updateComponentLanguage(e) {
    setComponentLanguage(e);
  }

  function updateUsernameState(e) {
    setUsername(e.target.value);
  }

  function updatePasswordState(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="Login">
      <div className="languageDiv">
        <button className={engSelected()} onClick={onEngClick}>
          {language.enLang}
        </button>
        <button className={finSelected()} onClick={onFinClick}>
          {language.fiLang}
        </button>
      </div>
      <p className="titleText">{language.title}</p>
      <div className="loginInfoDiv">
        <p className="normalText">{language.usEma}</p>
        <input
          type="text"
          className="infoInput"
          value={username}
          onChange={updateUsernameState}
        />
        <p className="normalText">{language.password}</p>
        <input
          type="text"
          className="infoInput"
          value={password}
          onChange={updatePasswordState}
        />
      </div>
      <div className="loginButtonDiv">
        <button className="normalButton" onClick={onLoginClick}>
          {language.login}
        </button>
        <button
          className="normalButton"
          id="loginRegisterButton"
          onClick={onRegisterClick}
        >
          {language.register}
        </button>
      </div>
    </div>
  );
}
