import React, { Component } from 'react';

import MyContext from '../../../../Context/MyContext'
import './style.scss';

class HeadLeft extends Component {
  constructor(props) {
    super(props);

    this.searchInput = React.createRef(null);
    this.state = {
      show: false,
    };
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
      if (hash) {
        hash = hash.slice(1).split('&').reduce((el, next) => {
          let [key, value] = next.split('=');

          el[decodeURIComponent(key) === 'tag' ? 'tags' : decodeURIComponent(key)] = decodeURIComponent(value);
          return el;
        }, {});
      }
      else {
        hash = {}
      }

      if (searchValue)
        hash.search = searchValue;
      else
        delete hash.search;

      if (Object.keys(hash))
        window.location.hash =  Object.entries(hash).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('=');
    }
  };
}

HeadLeft.contextType = MyContext.Consumer;
export default HeadLeft;
