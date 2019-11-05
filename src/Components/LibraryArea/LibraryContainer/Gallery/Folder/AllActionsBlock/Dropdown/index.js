import React, { Component } from 'react';

import GalleryEditMenu from '../../../../../../../Services/GalleryEditMenu';
import { DropDownOptions } from '../../../../../../../Constants';
import './style.scss';

class DropDown extends Component {
  constructor(props) {
    super(props);

    const { open, timer } = props;

    this.time = null;
    this.state = {
      opened: open ? 'block' : 'none',
    };
    this. mouseEvents = {
      onMouseEnter : () => {
        clearTimeout(timer);
        clearTimeout(this.time);
        console.log('open');
        this.setState({
          opened: 'block',
        })
      },
      onMouseLeave: () => {
        this.time = setTimeout(() => {
          this.setState({
            opened: 'none',
          }, () => {console.log(this.state.opened, 'oooo')});
          console.log('leave');
        }, 700);
      }
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      opened: nextProps.open ? 'block' : 'none',
    }
  }
  
  render() {
    return (
      <div
        className='itemsDropdown noheader actionsMenu'
        style={{display: this.state.opened}}
        {...this.mouseEvents}
      >
        <div
          className='itemsDropdown_items'
          style={{display: this.state.opened}}
          {...this.mouseEvents}
        >
          <ul className='controls'>
            {DropDownOptions.map(option => (
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
  }
}

export default DropDown;
