import React from 'react';
import './style.css'

const GlassInput = React.forwardRef((props, ref) => {
  return (
      <input ref={ref} className="input" {...props}/>
  );
});

export default GlassInput;