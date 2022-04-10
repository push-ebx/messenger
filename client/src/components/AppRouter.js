import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Login from "./Login";
import {Col, Row} from "react-bootstrap";
import Chat from "./Chat";

const AppRouter = () => {
  return (
      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
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
        <Route path="/chats">
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
  );
};

export default AppRouter;