import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import DoneRoute from "./components/routes/DoneRoute";
import HomeRoute from "./components/routes/HomeRoute";
import SettingsRoute from "./components/routes/SettingsRoute";
import TaskSettingsRoute from "./components/routes/TaskSettingsRoute";
import NewTaskRoute from "./components/routes/NewTaskRoute";

import PublicRoute from "./components/routes/PublicRoute";
import PrivateRoute from "./components/routes/PrivateRoute";
import { AuthProvider } from "./components/contexts/AuthContext";
import { LanguageProvider } from "./components/contexts/LanguageContext";

export default function App() {
  return (
    <div className="App">
      <Router>
        <LanguageProvider>
          <AuthProvider>
            <Switch>
              <PublicRoute component={Login} path="/" exact />
              <PublicRoute component={Register} path="/register" exact />
              <PrivateRoute component={DoneRoute} path="/done" exact />
              <PrivateRoute component={HomeRoute} path="/home" exact />
              <PrivateRoute component={SettingsRoute} path="/settings" exact />
              <PrivateRoute
                component={TaskSettingsRoute}
                path="/taskSettings"
                exact
              />
              <PrivateRoute component={NewTaskRoute} path="/newTask" exact />
            </Switch>
          </AuthProvider>
        </LanguageProvider>
      </Router>
    </div>
  );
}
