import React, { useState } from 'react'

import GalleryEditMenu from '../../../../../../../libs/GalleryEditMenu'
import { DropDownOptions } from '../../../../../../../Constants'
import './style.scss'

const DropDown = ({ open }) => {
  const [opened, setOpen] = useState(open ? open : 'none');
  const mouseEvents = {
    onMouseEnter : () => {
      clearTimeout(time);
      setOpen('block')
    },
    onMouseLeave: () => {
      time = setTimeout(() => setOpen('none'), 1500);
    }
  };
  let time;

  return (
    <div
      className='itemsDropdown noheader actionsMenu'
      style={{display: opened}}
      { ...mouseEvents }
    >
      <div
        className='itemsDropdown_items'
        style={{display: opened}}
        { ...mouseEvents }
      >
        <ul className='controls'>
          { DropDownOptions.map(option => (
            <li className={option.className} rel={option.rel}>
              <a data-eventname={option.a['data-eventname'] ? option.a['data-eventname'] : ''}
                 className={option.a.className ? option.a.className : ''}
              >
                <i className={option.a.i.className}
                   data-eventname={option.a.i['data-eventname'] ? option.a.i['data-eventname'] : ''}
                />
                <b>{option.a.b.text}</b>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropDown;