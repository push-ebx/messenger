import React, {useContext} from 'react';
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import Login from "./Login";
import {Col, Row} from "react-bootstrap";
import Chat from "./Chat";
import {AuthContext} from "../context/auth_context";
import Register from "./Register";
import ListChats from "./ListChats";

const AppRouter = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext)
  const router = useHistory()

  const LogOut = () => {
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    setIsAuth(false)
    router.push('/login')
  }

  return (
      isAuth
          ?
          <Switch>
            <Route path="/chats/:id">
              <button style={{margin: '15px', position: 'absolute'}} className={'btn btn-primary'}
                      onClick={LogOut}>Выход
              </button>
              <div className="container-lg container-fluid">
                <Row className="px-md-5" style={{height: '100vh'}}>
                  <Col md={4} style={{height: '100%', padding: '1vh 0'}} className="d-none d-lg-block">
                    <Col className="glass" style={{height: '15%', marginRight: '1vh'}}>Поиск</Col>
                    <Col className="glass listChat-wrapper" style={{height: '84%', marginTop: '1vh', marginRight: '1vh'}}>
                      <ListChats/>
                    </Col>
                  </Col>
                  <Chat/>
                </Row>
              </div>
            </Route>
            <Route path="/chats">
              <button style={{margin: '15px', position: 'absolute'}} className={'btn btn-primary'}
                      onClick={LogOut}>Выход
              </button>
              <div className="container-lg container-fluid">
                <Row className="px-md-5" style={{height: '100vh'}}>
                  <Col md={4} style={{height: '100%', padding: '1vh 0'}} className="d-none d-lg-block">
                    <Col className="glass" style={{height: '15%', marginRight: '1vh'}}>Поиск</Col>
                    <Col className="glass" style={{height: '84%', marginTop: '1vh', marginRight: '1vh'}}>Сообщения</Col>
                    <ListChats/>
                  </Col>
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