import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Login from "./Login";
import {Col, Row} from "react-bootstrap";
import Chat from "./Chat";
import {AuthContext} from "../context";

const AppRouter = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);

  return (
      isAuth
          ?
          <Switch>
            <Route path="/chats/:id">
              <div className="container-lg container-fluid">
                <Row className="px-md-5" style={{height: '100vh'}}>
                  <Col md={4} style={{height: '100%', padding: '1vh 0'}} className="d-none d-lg-block">
                    <Col className="glass" style={{height: '20%', marginRight: '1vh'}}>Поиск</Col>
                    <Col className="glass" style={{height: '79%', marginTop: '1vh', marginRight: '1vh'}}>Сообщения</Col>
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
            <Redirect to="/login"/>
          </Switch>
  );
};

export default AppRouter;