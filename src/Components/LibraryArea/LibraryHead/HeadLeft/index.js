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
      searchText: props.searchText
    };
    this.timer = 400;
    this.timeout = null;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      show: prevState.show,
      searchText: nextProps.searchText
    }
  }

  render() {
    const className = this.state.show ? 'show' : '';
    return (
      <div className='headLeft'>
        <div className='searchBox'>
          <a className='search_img btn trans'>
            <i className='icon-search'/>
          </a>
          <input
            ref={this.searchInput}
            type='text'
            placeholder='Search...'
            className='search_input'
            onKeyUp={e => this.textEnter(e)}
            defaultValue={this.context.searchText}
          />
          <a onClick={() => {
            this.searchInput.current.value = '';
            this.setState({ show:false });
          }} className={'reset_search ' + className}>X</a>
        </div>
      </div>
    )
  }

  textEnter = ev => {
    let searchValue = this.searchInput.current.value.trim();
    searchValue ?
      this.setState({ show: true }) :
      this.setState({ show: false });
    if (ev.which === 13 || !searchValue) {
      let {hash} = window.location;
      hash = HashController.ParseHash(hash);

      if (searchValue)
        hash.search = searchValue;
      else
        delete hash.search;

      if (Object.keys(hash))
        window.location.hash =  HashController.CollectHash(hash);
    }
  };
}

HeadLeft.contextType = MyContext.Consumer;
export default HeadLeft;
