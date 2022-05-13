import React from 'react';
import {Col} from "react-bootstrap";
import GlassInput from "./UI/glassInput/GlassInput";
import ListChats from "./ListChats";
import {useSelector} from "react-redux";

const Sidebar = () => {
  const thisUser = useSelector(state => state.thisUserReducer.thisUser)

  return (
      <Col md={4} xl={3} style={{height: '100%', padding: '1vh 0'}} className="d-none d-lg-block">
        <Col className="glass d-flex flex-column align-items-center justify-content-center" style={{height: '15%', marginRight: '1vh'}}>
          <h4 style={{alignSelf: "self-start", marginLeft: '7.5%', fontSize: 24}}>{thisUser.first_name} {thisUser.last_name}</h4>
          <GlassInput placeholder="Search..." style={{width: '85%', height: '27%', borderRadius: 9, marginTop: 10}}/>
        </Col>
        <Col className="glass listChat-wrapper"
             style={{height: '84%', marginTop: '1vh', marginRight: '1vh'}}>
          <ListChats/>
        </Col>
      </Col>
  );
};

export default Sidebar;