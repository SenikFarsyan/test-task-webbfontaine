import React from 'react';

//styles
import classes from './preview.module.css';

const TextSample = ({ text, userInput }) => {
  const sample = text.split('');
  return (
    <div className={classes.textSample}>
      {sample.map((s, i) => {
        let color;
        if (i < userInput.length) {
          color = s === userInput[i] ? 'yellow' : 'red';
        }
        return (
          <span key={i} style={{ backgroundColor: color }}>
            {s}
          </span>
        );
      })}
    </div>
  );
};

export default TextSample;
