import React, { Component } from 'react';

import MyContext from '../../../../Context/MyContext';
import HashController from '../../../../libs/hashController';

import './style.scss';

class HeadLeft extends Component {
  constructor(props) {
    super(props);

    this.searchInput = React.createRef(null);
    this.state = {
      show: false,
    };
    this.timer = 400;
    this.timeout = null;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      show: prevState.show,
    };
  }

  textEnter = ev => {
    let searchValue = this.searchInput.current.value.trim();
    this.setState({ show: Boolean(searchValue) });
    if (ev.which === 13 || !searchValue) {
      let {hash} = window.location;
      hash = HashController.ParseHash(hash);

      if (searchValue)
        hash.search = searchValue;
      else
        delete hash.search;

      if (Object.keys(hash))
        window.location.hash = HashController.CollectHash(hash);
    }
  };

  resetInput = () => {
    this.searchInput.current.value = '';
    this.setState({ show: false });
  };

  render() {
    const className = this.state.show ? 'show' : '';
    return (
      <div className="headLeft">
        <div className="searchBox">
          <a className="search_img btn trans">
            <i className="icon-search"/>
          </a>
          <input
            ref={this.searchInput}
            type="text"
            placeholder="Search..."
            className="search_input"
            onKeyUp={this.textEnter}
            defaultValue={this.context.searchText}
          />
          <a onClick={this.resetInput} className={'reset_search ' + className}>X</a>
        </div>
      </div>
    )
  }
}

HeadLeft.contextType = MyContext.Consumer;
export default HeadLeft;
