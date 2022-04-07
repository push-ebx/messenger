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

const Chat = (props) => {
  const [messages, setMessages] = useState([{message: "Mes1", id: 1}, {message: "Messsss2", id: 2}]);
  const inputRef = useRef();

  useEffect(() => {

  }, []);

  useEffect(() => {
    // socket.emit(events.IS_ONLINE, {token:cookie.parse(document.cookie).access_token});
    // socket.on(events.IS_ONLINE, e => console.log(e));
    socket.on(events.MESSAGE_GET, e => console.log(e.message?.text))
    window.socket = socket
  }, [messages]);

  const check = async (e) => {
    if (e.keyCode === 13) {
      const mes = {
        receiver_id: 12,
        text: inputRef.current.value
      };
      socket.emit(events.MESSAGE_SEND, mes);
      send(mes);
      inputRef.current.value = '';
    }
  }

  return (
      <div {...props}>
        <GlassPanel>
          <GlassInput onKeyDown={(e => check(e))} ref={inputRef}
                      style={{position: 'absolute', bottom: '10px', margin: "20px", width: "860px"}}/>
          <div className="messages">
            {messages.map(mes =>
                <Message time={`${(new Date()).getHours()}:${(new Date()).getMinutes()} PM`}
                         key={mes.id}>{mes.message}
                </Message>
            )}
          </div>
        </GlassPanel>
      </div>
  );
};

export default Chat;