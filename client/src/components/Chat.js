import React, {useEffect, useRef, useState} from 'react';
import GlassPanel from "./UI/glassPanel/GlassPanel";
import GlassInput from "./UI/glassInput/GlassInput";
import axios from "axios";
import Message from "./Message/Message";
import io from 'socket.io-client';
import {registration, login} from '../API/auth'
import {getById, getByUsername} from "../API/users";
import {createConversation, getConversationById, getConversations, send} from "../API/messages";
import cookie from 'cookie'

// const socket = io('/')

const Chat = (props) => {
  const [messages, setMessages] = useState([{message: "Mes1", id: 1}, {message: "Messsss2", id: 2}]);
  const inputRef = useRef();

  useEffect(() => {

  }, []);

  useEffect(() => {
    // console.log(messages)
  }, [messages]);

  const check = async (e) => {
    if (e.keyCode === 13) {
      inputRef.current.value = '';
      // await login("@@@@", "@@@@")
      //     .then(res => {
      //       const error_code = res.data.error?.code;
      //       if (error_code) {
      //         error_code === 404 && console.log("User not found");
      //         error_code === 422 && console.log("Entered invalid password");
      //       } else {
      //         document.cookie = `access_token=${res.data.token}; `;
      //         console.log(res.data);
      //       }
      //     })
      //     .catch(err => err.response.status === 400 && console.log("Login error"))

      // await axios_proxy.get('/users/getById?id=12',
      //     {headers: {Authorization: `Bearer ${cookie.parse(document.cookie).access_token}`}})
      //     .then(res => console.log(res))

      // await getByUsername("admin").then(u=>console.log((u)))
      await send({receiver_id: "11", text: "test2"}).then(e => console.log(e))
      // await createConversation({second_id: 11}).then(c => console.log(c))
      // await getConversations().then(lc=>console.log(lc))
      await getConversationById(11).then(lc=>console.log(lc))
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