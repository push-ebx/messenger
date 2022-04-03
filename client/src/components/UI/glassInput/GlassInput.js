import React from 'react';
import './style.css'

const GlassInput = React.forwardRef((props, ref) => {
  return (
      <input autoFocus ref={ref} className="input" placeholder="Message..." {...props}/>
  );
});

export default GlassInput;