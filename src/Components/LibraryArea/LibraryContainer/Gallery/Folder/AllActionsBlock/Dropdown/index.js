import React, { Component } from 'react';

import { DropDownOptions } from '../../../../../../../Constants';

import GalleriesController from '../../../../../../../Services/galleriesController';
import GalleryEditMenu from '../../../../../../../Services/GalleryEditMenu';

import Option from './Option';

import './style.scss';

class DropDown extends Component {
  constructor(props) {
    super(props);

    const { open, timer } = props;

    this.time = null;
    this.state = {
      opened: open ? 'block' : 'none',
    };
    this.mouseEvents = {
      onMouseEnter : () => {
        clearTimeout(timer);
        clearTimeout(this.time);
        this.setState({
          opened: 'block',
        })
      },
      onMouseLeave: () => {
        this.time = setTimeout(() => {
          this.setState({
            opened: 'none',
          }, () => {console.log(this.state.opened, 'oooo')});
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
              <Option
                fid={this.props.fid}
                name={this.props.name}
                {...option}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default DropDown;
