import React, { useContext, useState, useEffect } from "react";
import { auth, firebase } from "../../firebase";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext();

const asyncLocalStorage = {
  setItem: async function (key, value) {
    await Promise.resolve();
    localStorage.setItem(key, value);
  },
  getItem: async function (key) {
    await Promise.resolve();
    return localStorage.getItem(key);
  },
};

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState();
  const [username, setUsername] = useState();
  const [update, setUpdate] = useState(false);
  const [updateName, setUpdateName] = useState(false);
  const [jwtToken, setJwtToken] = useState("");

  function signup(email, password, uname) {
    let createdUser = auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        if (user) {
          user.user.updateProfile({
            displayName: uname,
          });
          setUsername(uname);
          setUpdateName(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
    return createdUser;
  }

  async function login(email, password) {
    return new Promise((resolve, reject) => {
      auth.signInWithEmailAndPassword(email, password).then(() => {
        auth.currentUser.getIdToken(true).then(async (token) => {
          if (token) {
            setJwtToken(token);
            asyncLocalStorage
              .setItem("@token", token)
              .then(history.push("/home"));
            resolve();
          } else {
            reject("pieleen meni");
          }
        });
      });
    });
  }

  async function loginPopupGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return new Promise((resolve, reject) => {
      auth.signInWithPopup(provider).then(() => {
        auth.currentUser.getIdToken(true).then(async (token) => {
          if (token) {
            setJwtToken(token);
            asyncLocalStorage
              .setItem("@token", token)
              .then(history.push("/home"));
            resolve();
          } else {
            reject("pieleen meni");
          }
        });
      });
      resolve();
    });
  }

  function logout() {
    setJwtToken("");
    localStorage.removeItem("@token");
    return auth.signOut();
  }

  function deleteUser() {
    return currentUser.delete();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updateUsername(uname) {
    setUsername(uname);
    return currentUser.updateProfile({ displayName: uname });
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setUsername(user ? user.displayName : "nobody");
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateUsername,
    username,
    update,
    setUpdate,
    updateName,
    setUpdateName,
    setUsername,
    loginPopupGoogle,
    deleteUser,
    jwtToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
