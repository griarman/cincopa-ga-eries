import React from 'react';

const Buttons = ({ action, handleEvents }) => (
  <a
    className={action.className}
    data-eventname={action['data-eventname'] ? action['data-eventname'] : ''}
    rel={action.rel ? action.rel : ''}
    {...handleEvents[action.events]}
  >
    <i
      className={action.i.className}
      data-eventname={action.i['data-eventname'] ? action.i['data-eventname'] : ''}
    />
    <b className={action.b.className}>{action.b.text}</b>
  </a>
);

export default Buttons;
