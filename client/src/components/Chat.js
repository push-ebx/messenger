import React, {useEffect, useRef, useState} from 'react';
import GlassPanel from "./UI/glassPanel/GlassPanel";
import GlassInput from "./UI/glassInput/GlassInput";
import Message from "./Message/Message";
import {registration, login} from '../API/methods/auth'
import {getById, getByUsername, getIdByToken} from "../API/methods/users";
import {createConversation, getConversationById, getConversations, send} from "../API/methods/messages";
import cookie from 'cookie'
import socket from "../API/socket";
import events from "../events"
import {Col} from "react-bootstrap";
import {useParams} from "react-router-dom";

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const params = useParams()
  const inputRef = useRef();
  const [thisUser, setThisUser] = useState({
    id: null,
    username: "NoName",
    first_name: "NoName",
    last_name: "NoName",
    sex: null
  })

  const getConv = async () => {
    if (params.id) await getConversationById(params?.id).then((res) => res && setMessages(res.data))
  }

  useEffect(async () => {
    await getById().then(res => setThisUser(prevState => res.data))
    await socket.on(events.MESSAGE_GET, mes => {
      if(mes.sender_id !== thisUser.id) {
        setMessages(prevState => [...prevState, {...mes, _id: mes?._id}])
        scrollToBottom('messages')
      }
    })
    await getConv()
    scrollToBottom('messages')
  }, []);

  useEffect(() => {
    // socket.emit(events.IS_ONLINE, {token:cookie.parse(document.cookie).access_token});
    // socket.on(events.IS_ONLINE, e => console.log(e));
    // socket.on(events.MESSAGE_GET, e => console.log(e.message?.text))
    // window.socket = socket
  }, [messages]);
  const scrollToBottom = (id) => {
    const element = document.getElementById(id);
    element.scrollTop = element.scrollHeight;
  }
  const check = async (e) => {
    if (e.keyCode === 13) {
      const mes = {
        receiver_id: params.id,
        sender_id: thisUser.id,
        text: inputRef.current.value
      };
      inputRef.current.value = '';
      await send(mes).then(res => {
        // setMessages(prevState =>
        //     [...prevState, {...mes, _id: res?.data._id}]
        // )
        console.log("3")
        socket.emit(events.MESSAGE_SEND, {...mes, _id: res?.data._id});
      }) /// catch text is required
      scrollToBottom('messages')
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
          <div className="messages" id="messages">
            {messages.map(mes =>
                <Message right={Boolean(mes.sender_id === thisUser.id)}
                         time={`${(new Date()).getHours()}:${(new Date()).getMinutes()}`}
                         key={mes._id}>
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