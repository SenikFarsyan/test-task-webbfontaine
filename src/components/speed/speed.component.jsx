import React from 'react';

const Speed = ({ wpm }) => {
  if (wpm) {
    return <div>{wpm} wpm</div>;
  }
  return null;
};

export default Speed;
