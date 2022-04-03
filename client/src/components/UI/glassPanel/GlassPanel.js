import React from 'react';
import './style.css';

const GlassPanel = (props) => {
  return (
      <div className="panel" {...props}>
        {props.children}
      </div>
  );
};

export default GlassPanel;