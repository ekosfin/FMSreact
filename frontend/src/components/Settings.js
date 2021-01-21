import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles.css";
import { eng } from "../languages/en.js";
import { fin } from "../languages/fi.js";

export default function Settings(props) {
  const history = useHistory();
  const [language, setComponentLanguage] = useState(() => getLangFromProp());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPwAgain, setNewPwAgain] = useState("");

  useEffect(() => {
    fetchInfo();
  }, []);

  function fetchInfo() {
    fetch("http://localhost:4000/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmail(data.email);
        setUsername(data.username);
      });
  }

  function getLangFromProp() {
    if (props.language === "eng") {
      return eng;
    } else if (props.language === "fin") {
      return fin;
    }
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

  function onTaskTabClick() {
    history.push("/taskSettings");
  }

  function onEngClick() {
    props.setLanguage("eng");
    updateComponentLanguage(eng);
  }

  function onFinClick() {
    props.setLanguage("fin");
    updateComponentLanguage(fin);
  }

  function onSaveClick() {
    if (newPw) {
      if (newPw !== newPwAgain) {
        console.log("New password mismatch");
        return;
      }
    }

    const bodyData = {
      password: password,
      newpassword: newPw.length === 0 ? null : newPw,
      newusername: username,
      newemail: email,
    };

    fetch("http://localhost:4000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(bodyData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function onDeleteUserClick() {
    //TODO: Alert of some kind to confirm this is wanted

    fetch("http://localhost:4000/user", {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    history.push("/");
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

  function updateNewPasswordState(e) {
    setNewPw(e.target.value);
  }

  function updateNewPassword2State(e) {
    setNewPwAgain(e.target.value);
  }

  return (
    <div className="Settings">
      <div className="topDiv">
        <p className="pageTitle" id="pageTitleWithPadding">
          {language.settings}
        </p>
        <div className="tabDiv">
          <button className={"textOnlyButtonSelect"}>{language.userTab}</button>
          <button className={"textOnlyButton"} onClick={onTaskTabClick}>
            {language.taskTab}
          </button>
        </div>
      </div>
      <div className="settingsDivider">
        <p className="normalLeftText">{language.username}</p>
        <input
          type="text"
          className="settingInfoInput"
          value={username}
          onChange={updateUsernameState}
        />
      </div>
      <div className="settingsDivider">
        <p className="normalLeftText">{language.newPassword}</p>
        <input
          type="text"
          className="settingInfoInput"
          onChange={updateNewPasswordState}
          value={newPw}
        />
        <p className="normalLeftText">{language.newPwAgain}</p>
        <input
          type="text"
          className="settingInfoInput"
          onChange={updateNewPassword2State}
          value={newPwAgain}
        />
      </div>
      <div className="settingsDivider">
        <p className="normalLeftText">{language.email}</p>
        <input
          type="text"
          className="settingInfoInput"
          onChange={updateEmailState}
          value={email}
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
          onChange={updatePasswordState}
          value={password}
        />
        <button
          className="normalButton"
          id="settingsSave"
          onClick={onSaveClick}
        >
          {language.save}
        </button>
        <button
          className="normalButton"
          id="settingsDelete"
          onClick={onDeleteUserClick}
        >
          {language.deleteUser}
        </button>
      </div>
    </div>
  );
}
