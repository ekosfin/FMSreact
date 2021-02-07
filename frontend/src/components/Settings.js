import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../styles.css";
import { eng } from "../languages/en.js";
import { fin } from "../languages/fi.js";
import { useAuth } from "./contexts/AuthContext";

export default function Settings(props) {
  const history = useHistory();
  const [language, setComponentLanguage] = useState(() => getLangFromProp());
  const [email, setEmail] = useState("");
  const [textPass, setTextPass] = useState("");
  const [textUsername, setTextUsername] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPwAgain, setNewPwAgain] = useState("");
  const { currentUser, deleteUser, updatePassword } = useAuth();

  function fetchInfo() {
    setTextUsername(currentUser.displayName);
    setEmail(currentUser.email);
  }
  useEffect(() => {
    fetchInfo();
  }, []);

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

  async function onSaveClick() {
    if (newPw) {
      if (newPw !== newPwAgain) {
        console.log("New password mismatch");
        return;
      }
      //change password
      try {
        await updatePassword(newPw);
      } catch (error) {
        console.error(error);
      }
    }
    //change username
    if (currentUser.displayName !== textUsername) {
      try {
        currentUser.updateProfile({
          displayName: textUsername,
        });
      } catch (error) {
        console.error(error);
      }
    }
    //update email
    if (currentUser.email !== email) {
      try {
        currentUser.updateEmail(email);
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function onDeleteUserClick() {
    //TODO: Alert of some kind to confirm this is wanted

    await deleteUser();

    history.push("/");
  }

  function updateComponentLanguage(e) {
    setComponentLanguage(e);
  }

  function updateEmailState(e) {
    setEmail(e.target.value);
  }

  function updatePasswordState(e) {
    setTextPass(e.target.value);
  }

  function updateUsernameState(e) {
    setTextUsername(e.target.value);
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
        <p className="normalText">{language.username}</p>
        <input
          type="text"
          className="settingInfoInput"
          value={textUsername}
          onChange={updateUsernameState}
        />
      </div>
      <div className="settingsDivider">
        <p className="normalText">{language.newPassword}</p>
        <input
          type="password"
          className="settingInfoInput"
          onChange={updateNewPasswordState}
          value={newPw}
        />
        <p className="normalText">{language.newPwAgain}</p>
        <input
          type="password"
          className="settingInfoInput"
          onChange={updateNewPassword2State}
          value={newPwAgain}
        />
      </div>
      <div className="settingsDivider">
        <p className="normalText">{language.email}</p>
        <input
          type="text"
          className="settingInfoInput"
          onChange={updateEmailState}
          value={email}
        />
      </div>
      <div className="settingsDivider" id="settingsBottomPadding">
        <p className="normalText">{language.language}</p>
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
        <p className="normalText">{language.currentPw}</p>
        <input
          type="password"
          className="settingInfoInput"
          onChange={updatePasswordState}
          value={textPass}
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
