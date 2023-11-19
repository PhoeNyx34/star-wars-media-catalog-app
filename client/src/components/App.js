import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute"
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import MediaIndex from "./layout/MediaIndex"
import MediaShow from "./layout/MediaShow";
import AccountPage from "./layout/AccountPage";
import NewMediaForm from "./layout/NewMediaForm";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" render={(props) => {
          return <MediaIndex user={currentUser} {...props}/>
        }}/>
        <Route exact path="/users/new" component={RegistrationForm} />
        <AuthenticatedRoute exact path="/users/account" component={AccountPage} user={currentUser} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <AuthenticatedRoute exact path="/users/new-media" component={NewMediaForm} user={currentUser} />
        <Route exact path="/:id" render={(props) => {
          return <MediaShow user={currentUser} {...props}/>
        }}/>
      </Switch>
    </Router>
  );
};

export default hot(App);
