import React from 'react';
import './style.css';

const Message = (props) => {
  console.log(props.right)
  return (
      <div className={`message ${props.right ? 'right_mes' : 'left_mes'}`} {...props}>
        <span className="message_text">{props.children}</span>
        <span className="time">{props.time}</span>
      </div>
  );
};

export default Message;