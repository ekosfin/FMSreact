import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import BottomBar from './components/BottomBar';
import TopBar from './components/TopBar';
import Home from './components/Home';
import Settings from './components/Settings';
import DoneTasks from './components/DoneTasks';
import TaskSettings from './components/TaskSettings';
import NewTask from './components/NewTask';

export default function App() {
  const [language, setLanguage] = useState('eng');
  const [taskTitle, setTaskTitle] = useState('');

  function updateLanguage(e) {
    setLanguage(e);
  }

  function updateTaskTitle(e) {
    setTaskTitle(e);
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/done">
            <TopBar language={language} />
            <DoneTasks language={language} setTaskTitle={updateTaskTitle} />
            <BottomBar location="done" />
          </Route>
          <Route path="/home">
            <TopBar language={language} />
            <Home language={language} />
            <BottomBar location="home" />
          </Route>
          <Route path="/register">
            <Register setLanguage={updateLanguage} language={language} />
          </Route>
          <Route path="/settings">
            <TopBar language={language} />
            <Settings setLanguage={updateLanguage} language={language} />
            <BottomBar location="settings" />
          </Route>
          <Route path="/taskSettings">
            <TopBar language={language} />
            <TaskSettings language={language} />
            <BottomBar location="settings" />
          </Route>
          <Route path="/newTask">
            <TopBar language={language} />
            <NewTask
              language={language}
              taskTitle={taskTitle}
              setTaskTitle={updateTaskTitle}
            />
            <BottomBar location="none" />
          </Route>
          <Route path="/">
            <Login setLanguage={updateLanguage} language={language} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
