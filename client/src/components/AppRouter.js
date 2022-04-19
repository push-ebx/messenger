import React from 'react';
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import Login from "./Login";
import {Col, Row} from "react-bootstrap";
import Chat from "./Chat";
import Register from "./Register";
import ListChats from "./ListChats";
import {useDispatch, useSelector} from "react-redux";
import GlassInput from "./UI/glassInput/GlassInput";

const AppRouter = () => {
  const dispatch = useDispatch()
  const thisUser = useSelector(state => state.thisUserReducer.thisUser)
  const isAuth = useSelector(state => state.authReducer.isAuth)
  const router = useHistory()

  return (
      isAuth
          ?
          <Switch>
            <Route path="/chats/:id">
              <div className="container-lg container-fluid align-content-center">
                <Row className="px-md-5 justify-content-center" style={{height: '100vh'}}>
                  <Col md={4} xl={3} style={{height: '100%', padding: '1vh 0'}} className="d-none d-lg-block">
                    <Col className="glass d-flex flex-column align-items-center justify-content-center" style={{height: '15%', marginRight: '1vh'}}>
                      <h4 style={{alignSelf: "self-start", marginLeft: '7.5%'}}>{thisUser.first_name} {thisUser.last_name}</h4>
                      <GlassInput placeholder="Search..." style={{width: '85%'}}/>
                    </Col>
                    <Col className="glass listChat-wrapper"
                         style={{height: '84%', marginTop: '1vh', marginRight: '1vh'}}>
                      <ListChats/>
                    </Col>
                  </Col>
                  <Chat/>
                </Row>
              </div>
            </Route>
            <Route path="/chats">
              <div className="container-lg container-fluid align-content-center">
                <Row className="px-md-5 justify-content-center" style={{height: '100vh'}}>
                  <Col md={4} xl={3} style={{height: '100%', padding: '1vh 0'}} className="d-none d-lg-block">
                    <Col className="glass d-flex justify-content-center" style={{height: '15%', marginRight: '1vh'}}>
                      <GlassInput placeholder="Search..." style={{margin: 'auto', width: '85%'}}/>
                    </Col>
                    <Col className="glass listChat-wrapper"
                         style={{height: '84%', marginTop: '1vh', marginRight: '1vh'}}>
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