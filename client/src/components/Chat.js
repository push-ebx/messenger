import React, {useEffect, useRef, useState} from 'react';
import GlassInput from "./UI/glassInput/GlassInput";
import Message from "./Message/Message";
import {getById} from "../API/methods/users";
import {getConversationById, send} from "../API/methods/messages";
import socket from "../API/socket";
import events from "../events"
import {Col} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setThisUserAction} from "../store/thisUserReducer";
import {setCompanionAction} from "../store/companionReducer";

const Chat = () => {
  const dispatch = useDispatch()
  const inputRef = useRef()
  const params = useParams()
  const [messages, setMessages] = useState([])
  const [isLoadMessages, setIsLoadMessages] = useState(true)
  const [isLoadCompanion, setIsLoadCompanion] = useState(true)
  const thisUser = useSelector(state => state.thisUserReducer.thisUser)
  const companion = useSelector(state => state.companionReducer.companion)

  const getConv = async () => {
    if (params.id) await getConversationById(params?.id).then((res) => res && setMessages(res.data))
  }

  const foo = async () => {
    await getById(params?.id).then(res => dispatch(setCompanionAction(res.data))).then(setIsLoadCompanion(false))
    await getById().then(res => dispatch(setThisUserAction(res.data)))
    await socket.on(events.MESSAGE_GET, mes => {
      if (mes.sender_id !== thisUser.id) {
        setMessages(prevState => [...prevState, {...mes, _id: mes?._id}])
        scrollToBottom('messages')
      }
    })
    await getConv().then(setIsLoadMessages(false))
    scrollToBottom('messages')
  }

  useEffect(() => {
    foo()
  }, []);

  useEffect(async () => {
    await getConv().then(setIsLoadMessages(false))
    scrollToBottom('messages')
  }, [companion])

  useEffect(() => {
    // socket.emit(events.IS_ONLINE, {token:cookie.parse(document.cookie).access_token});
    // socket.on(events.IS_ONLINE, e => console.log(e));
    // socket.on(events.MESSAGE_GET, e => console.log(e.message?.text))
    // window.socket = socket

  }, [messages, isLoadMessages]);
  const scrollToBottom = (id) => {
    const element = document.getElementById(id);
    element.scrollTop = element.scrollHeight;
  }
  const check = async (e) => {
    if (e.keyCode === 13) {
      if (!inputRef.current.value.trim()) return;
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
        socket.emit(events.MESSAGE_SEND, {...mes, _id: res?.data._id});
      }) /// catch text is required
      scrollToBottom('messages')
    }
  }

  return (
      <Col style={{height: '100%', padding: '1vh 0'}} className="col-12 col-lg-8 col">
        <Col className="glass" style={{height: '10%'}}>
          {
              !isLoadCompanion
              &&
              <h5 style={{margin: '15px'}}>{companion.first_name} {companion.last_name}</h5>
          }
        </Col>
        <Col className="glass" style={{
          height: '89%',
          marginTop: '1vh',
          display: "flex",
          flexDirection: 'column',
          justifyContent: 'end'
        }}>
          <div className="messages" id="messages">
            {!isLoadMessages
                ?
                <>
                  {messages.map(mes =>
                      <Message right={Number(mes.sender_id === thisUser.id)}
                               time={`${(new Date()).getHours()}:${(new Date()).getMinutes()}`}
                               key={mes._id}>
                        {mes.text}
                      </Message>
                  )}
                </>
                :
                <h3 style={{margin: "auto"}}>Загрузка...</h3>
            }
          </div>
          <div className="flex-grow-0 px-4" style={{marginBottom: '15px'}}>
            <GlassInput onKeyDown={(e => check(e))} ref={inputRef}/>
          </div>
        </Col>
      </Col>
  );
};

export default Chat;