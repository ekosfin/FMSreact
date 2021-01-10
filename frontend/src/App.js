import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import BottomBar from "./components/BottomBar";
import Home from "./components/Home";
import Settings from "./components/Settings";
import DoneTasks from "./components/DoneTasks";

export default function App() {
  const [language, setLanguage] = useState("eng");

  function updateLanguage(e) {
    setLanguage(e);
  }

  return (
    <div className="App">
      <Router>
        <Switch> 
          <Route path="/done">
            <BottomBar/>
            <DoneTasks language={language}/>
          </Route>
          <Route path="/home">
            <BottomBar/>
            <Home language={language}/>
          </Route>
          <Route path="/register">
            <Register setLanguage={updateLanguage} language={language}/>
          </Route>
          <Route path="/settings">
            <BottomBar/>
            <Settings language={language}/>
          </Route>
          <Route path="/">
            <Login setLanguage={updateLanguage} language={language}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
