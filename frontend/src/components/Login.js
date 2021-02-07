import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles.css";
import { eng } from "../languages/en.js";
import { fin } from "../languages/fi.js";
import { useAuth } from "./contexts/AuthContext";
import { useLanguage } from "./contexts/LanguageContext";

export default function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginPopupGoogle } = useAuth();
  const { language, updateLanguage } = useLanguage();
  const [lang, setComponentLanguage] = useState(() => getLangFromProp());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function getLangFromProp() {
    if (language === "eng") {
      return eng;
    } else if (language === "fin") {
      return fin;
    }
  }

  function onEngClick() {
    updateLanguage("eng");
    updateComponentLanguage(eng);
  }

  function onFinClick() {
    updateLanguage("fin");
    updateComponentLanguage(fin);
  }

  async function onLoginClick() {
    try {
      setError("");
      setLoading(true);
      await login(username, password);
      history.push("/home");
    } catch {
      setError("Failed to login");
    }
    setLoading(false);
  }

  function onRegisterClick() {
    history.push("/register");
  }

  function onForgottenPwClick() {}

  async function onGoogleLoginClick() {
    try {
      setError("");
      setLoading(true);
      await loginPopupGoogle();
      history.push("/home");
    } catch (error) {
      console.error(error);
      setError("Failed to login");
    }
    setLoading(false);
  }

  function engSelected() {
    if (lang === eng) {
      return "textOnlyButtonSelect";
    } else {
      return "textOnlyButton";
    }
  }

  function finSelected() {
    if (lang === fin) {
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
          {lang.enLang}
        </button>
        <button className={finSelected()} onClick={onFinClick}>
          {lang.fiLang}
        </button>
      </div>
      <p className="titleText">{lang.title}</p>
      {error && <p>{error /* tähän siis tulee error viesti esille */}</p>}
      <div className="loginInfoDiv">
        <p className="normalText">{lang.usEma}</p>
        <input
          type="text"
          className="infoInput"
          value={username}
          onChange={updateUsernameState}
        />
        <p className="normalText">{lang.password}</p>
        <input
          type="password"
          className="infoInput"
          value={password}
          onChange={updatePasswordState}
        />
      </div>
      <div className="loginButtonDiv">
        <button
          className="normalButton"
          onClick={onLoginClick}
          disabled={loading}
        >
          {lang.login}
        </button>
        <button
          className="normalButton"
          id="loginGoogleButton"
          onClick={onGoogleLoginClick}
          disabled={loading}
        >
          {lang.google}
        </button>
        <button
          className="normalButton"
          id="loginRegisterButton"
          onClick={onRegisterClick}
        >
          {lang.register}
        </button>
        <button
          className="smallBorderButton"
          id="forgotPw"
          onClick={onForgottenPwClick}
        >
          {lang.forgottenPw}
        </button>
      </div>
    </div>
  );
}
