import React, { useContext, useState, useEffect } from "react";
import { auth, firebase } from "../../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [username, setUsername] = useState();
  const [update, setUpdate] = useState(false);
  const [updateName, setUpdateName] = useState(false);

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

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  async function loginPopupGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider).then(async (results) => {
      const token = await auth?.currentUser?.getIdToken(true);
      if (token) {
        localStorage.setItem("@token", token);
      }
    });
  }

  function logout() {
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
