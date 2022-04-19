import React, {useEffect, useRef, useState} from 'react';
import GlassInput from "./UI/glassInput/GlassInput";
import Message from "./Message/Message";
import {getById} from "../API/methods/users";
import {getConversationById, send} from "../API/methods/messages";
import socket from "../API/socket";
import events from "../events"
import {Col} from "react-bootstrap";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setThisUserAction} from "../store/thisUserReducer";
import {setCompanionAction} from "../store/companionReducer";
import {switchIsAuthAction} from "../store/authReducer";

const Chat = () => {
  const dispatch = useDispatch()
  const inputRef = useRef()
  const params = useParams()
  const [messages, setMessages] = useState([])
  const [isLoadMessages, setIsLoadMessages] = useState(true)
  const thisUser = useSelector(state => state.thisUserReducer.thisUser)
  const companion = useSelector(state => state.companionReducer.companion)
  const router = useHistory();

  const getConv = async () => {
    if (params.id) await getConversationById(params?.id).then((res) => res && setMessages(res.data))
  }

  const foo = async () => {
    if (params.id) {
      await getById(params.id).then(res => dispatch(setCompanionAction(res.data)))
    }
    await getById().then(res => dispatch(setThisUserAction(res.data)))
    await socket.on(events.MESSAGE_GET, mes => {
      if (mes.sender_id !== thisUser.id) {
        setMessages(prevState => [...prevState, {...mes, _id: mes?._id}])
        companion.id && scrollToBottom('messages')
      }
    })
    await getConv().then(setIsLoadMessages(false))
    companion.id && scrollToBottom('messages')
  }

  useEffect(() => {
    console.log("render")
    foo()
  }, []);

  useEffect(async () => {
    console.log("switch")
    foo()
  }, [params.id])

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
    console.log(companion)
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

  const Logout = () => {
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
      <Col style={{height: '100%', padding: '1vh 0'}} className="col-12 col-lg-8 col">
        <Col className="glass d-flex justify-content-between align-items-center" style={{height: '10%'}}>
          {
              companion.id
              &&
              <h5 style={{margin: '15px'}}>{companion.first_name} {companion.last_name}</h5>
          }
          <button style={{margin: '15px', width: 100, height: 50}} className={'glass'}
                  onClick={Logout}>Logout
          </button>
        </Col>
        <Col className="glass" style={{
          height: '89%',
          marginTop: '1vh',
          display: "flex",
          flexDirection: 'column',
          paddingTop: 10
        }}>
          {
            companion.id ?
                <div style={{
                  height: '100%',
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
                    <GlassInput autoFocus placeholder="Message..." onKeyDown={(e => check(e))} ref={inputRef}/>
                  </div>
                </div>
                :
                <h4 style={{margin: "auto"}}>Выберите диалог</h4>
          }
        </Col>
      </Col>
  );
};

export default Chat;