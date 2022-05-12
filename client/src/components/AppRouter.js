import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Login from "./Login";
import {Row} from "react-bootstrap";
import Chat from "./Chat";
import Register from "./Register";
import {useSelector} from "react-redux";
import Sidebar from "./Sidebar";

const AppRouter = () => {
  const isAuth = useSelector(state => state.authReducer.isAuth);
  return (
      isAuth
          ?
          <Switch>
            <Route path="/chats/:id">
              <div className="container-lg container-fluid align-content-center">
                <Row className="px-md-5 justify-content-center" style={{height: '100vh'}}>
                  <Sidebar/>
                  <Chat/>
                </Row>
              </div>
            </Route>
            <Route path="/chats">
              <div className="container-lg container-fluid align-content-center">
                <Row className="px-md-5 justify-content-center" style={{height: '100vh'}}>
                  <Sidebar/>
                  <Chat/>
                </Row>
              </div>
            </Route>
            <Redirect to="/chats"/>
          </Switch>
          :
          <Switch>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/register">
              <Register/>
            </Route>
            <Redirect to="/login"/>
          </Switch>
  );
};

export default AppRouter;