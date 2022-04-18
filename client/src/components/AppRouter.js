import React from 'react';
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import Login from "./Login";
import {Col, Row} from "react-bootstrap";
import Chat from "./Chat";
import Register from "./Register";
import ListChats from "./ListChats";
import {useDispatch, useSelector} from "react-redux";
import {switchIsAuthAction} from "../store/authReducer";

const AppRouter = () => {
  const dispatch = useDispatch()
  const thisUser = useSelector(state => state.thisUserReducer.thisUser)
  const isAuth = useSelector(state => state.authReducer.isAuth)
  const router = useHistory()

  const LogOut = () => {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    dispatch(switchIsAuthAction(false))
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
              <div className="container-lg container-fluid align-content-center">
                <Row className="px-md-5" style={{height: '100vh'}}>
                  <Col md={4} xl={3} style={{height: '100%', padding: '1vh 0'}} className="d-none d-lg-block">
                    <Col className="glass" style={{height: '15%', marginRight: '1vh'}}>{thisUser.first_name} {thisUser.last_name}</Col>
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
                    <Col className="glass listChat-wrapper" style={{height: '84%', marginTop: '1vh', marginRight: '1vh'}}>
                      <ListChats/>
                    </Col>
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