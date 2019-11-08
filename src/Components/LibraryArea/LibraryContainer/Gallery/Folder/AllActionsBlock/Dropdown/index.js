import React, { Component } from 'react';

import { DropDownOptions } from '../../../../../../../Constants';

import Option from './Option';

import './style.scss';

class DropDown extends Component {
  constructor(props) {
    super(props);

    const { open } = props;

    this.time = null;
    this.state = {
      opened: open ? 'block' : 'none',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      opened: nextProps.open ? 'block' : 'none',
    }
  }

  closeDropDown = () => {
    this.setState({
      opened: 'none',
    })
  };
  
  render() {
    return (
      <div
        className='itemsDropdown noheader actionsMenu'
        style={{display: this.state.opened}}
      >
        <div
          className='itemsDropdown_items'
          style={{display: this.state.opened}}
        >
          <ul className='controls'>
            {DropDownOptions.map((option, index) => (
              <Option
                fid={this.props.fid}
                name={this.props.name}
                index={index}
                closeDropDown={this.closeDropDown}
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
