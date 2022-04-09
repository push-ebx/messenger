import React, {useEffect, useRef, useState} from 'react';
import GlassPanel from "./UI/glassPanel/GlassPanel";
import GlassInput from "./UI/glassInput/GlassInput";
import Message from "./Message/Message";
import {registration, login} from '../API/methods/auth'
import {getById, getByUsername} from "../API/methods/users";
import {createConversation, getConversationById, getConversations, send} from "../API/methods/messages";
import cookie from 'cookie'
import socket from "../API/socket";
import events from "../events"
import {Col} from "react-bootstrap";

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    // send({receiver_id: 18, text: "Как сам?"})
    getConversationById(18).then((res) => res && setMessages(res.data))
  }, []);

  useEffect(() => {
    // socket.emit(events.IS_ONLINE, {token:cookie.parse(document.cookie).access_token});
    // socket.on(events.IS_ONLINE, e => console.log(e));
    // socket.on(events.MESSAGE_GET, e => console.log(e.message?.text))
    // window.socket = socket

    console.log(messages)
  }, [messages]);

  const check = async (e) => {
    if (e.keyCode === 13) {
      const mes = {
        receiver_id: 18,
        text: inputRef.current.value
      };
      // socket.emit(events.MESSAGE_SEND, mes);
      inputRef.current.value = '';
      send(mes);
      getConversationById(18).then((res) => res && setMessages(prevState => res.data))
    }
  }

  return (
      <Col style={{height: '100%', padding: '1vh 0'}} className="col-12 col-lg-8">
        <Col className="glass" style={{height: '10%'}}>Собеседник</Col>
        <Col className="glass" style={{
          height: '89%',
          marginTop: '1vh',
          display: "flex",
          flexDirection: 'column',
          justifyContent: 'end'
        }}>
          <div className="messages">
            {messages.map(mes =>
                <Message right={Boolean(mes.sender_id === 17)} time={`${(new Date()).getHours()}:${(new Date()).getMinutes()}`}
                         key={mes.id}>
                  {mes.text}
                </Message>
            )}
          </div>
          <div className="flex-grow-0 px-4" style={{marginBottom: '15px'}}>
            <GlassInput onKeyDown={(e => check(e))} ref={inputRef}/>
          </div>
        </Col>
      </Col>
  );
};

export default Chat;