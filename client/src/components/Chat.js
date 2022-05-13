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

  const foo = async () => {
    let _companion, _thisUser;
    if (params.id) {
      await getById(params.id).then(res => {
        _companion = res.data
        dispatch(setCompanionAction(_companion));
      });
      await getById().then(res => {
        _thisUser = res.data
        dispatch(setThisUserAction(_thisUser));
      });
    }

    await socket.on(events.MESSAGE_GET, mes => {
      if (mes.sender_id !== _thisUser.id) {
        setMessages(prevState => [...prevState, {...mes, _id: mes?._id}])
        _companion.id && scrollToBottom('messages')
      }
    })
  }

  const bar = async () => {
    companion.id && await getConversationById(companion.id).then(res => setMessages(res.data)).then(setIsLoadMessages(false))
    scrollToBottom('messages')
  }

  useEffect(() => {
    foo()
  }, []);

  useEffect(() => {
    bar()
  }, [companion])

  useEffect(() => {
    // socket.emit(events.IS_ONLINE, {token:cookie.parse(document.cookie).access_token});
    // socket.on(events.IS_ONLINE, e => console.log(e));
    // socket.on(events.MESSAGE_GET, e => console.log(e.message?.text))
    // window.socket = socket
  }, [messages, isLoadMessages]);

  const scrollToBottom = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollTop = element.scrollHeight;
  }

  const sendMessage = async () => {
    if (!inputRef.current.value.trim()) return;
    const mes = {
      receiver_id: params.id,
      sender_id: thisUser.id,
      text: inputRef.current.value
    };
    inputRef.current.value = '';
    await send(mes).then(res => {
      setMessages(prevState =>
          [...prevState, {...mes, _id: res?.data._id}]
      )
      socket.emit(events.MESSAGE_SEND, {...mes, _id: res?.data._id});
    }) /// catch text is required
    scrollToBottom('messages')
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
        paddingTop: 0
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
              <div className="flex-grow-0" style={{marginBottom: '0px', display: "flex", position: "relative"}}>
                <GlassInput style={{border:'none', borderRadius: "0 0 9px 9px"}}
                            autoFocus placeholder="Message..."
                            onKeyDown={(e => e.keyCode === 13 && sendMessage())}
                            ref={inputRef}/>
                <span className="material-symbols-outlined send-btn" onClick={() => sendMessage()}>send</span>
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