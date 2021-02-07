import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles.css";
import { eng } from "../languages/en.js";
import { fin } from "../languages/fi.js";
import { useAuth } from "./contexts/AuthContext";
import { useLanguage } from "./contexts/LanguageContext";

export default function Register() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { signup } = useAuth();
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

  async function onRegisterClick() {
    try {
      setError("");
      setLoading(true);
      await signup(email, password, username);
      history.push("/");
    } catch {
      setError("Failed to create an account");
      setLoading(false);
    }
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
          {lang.enLang}
        </button>
        <button className={finSelected()} onClick={onFinClick}>
          {lang.fiLang}
        </button>
      </div>
      <p className="titleText">{lang.title}</p>
      {error && <p>{error /* tähän siis tulee error viesti esille */}</p>}
      <p className="highlightText">{lang.registerExplanation}</p>
      <div id="registerInfoWrapper">
        <div className="registerInfoDiv">
          <p className="normalText">{lang.email + "*"}</p>
          <input
            type="text"
            className="infoInput"
            value={email}
            onChange={updateEmailState}
          />
          <p className="normalText">{lang.password + "*"}</p>
          <input
            type="password"
            className="infoInput"
            value={password}
            onChange={updatePasswordState}
          />
          <p className="normalText">{lang.username}</p>
          <input
            type="text"
            className="infoInput"
            value={username}
            onChange={updateUsernameState}
          />
          <p className="smallHighlightText">{lang.starEqualsRequired}</p>
        </div>
      </div>
      <button
        className="normalButton"
        id="registerButton"
        onClick={onRegisterClick}
        disabled={loading}
      >
        {lang.registerNow}
      </button>
    </div>
  );
}
