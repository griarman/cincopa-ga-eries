import React, { useState } from 'react'

import './style.scss'

const HeadLeft = () => {
  const [show, setShow] = useState(false);
  const className = show ? 'show' : '';
  return (
    <div className='headLeft'>
      <div className='searchBox'>
        <a className='search_img btn trans'>
          <i className='icon-search'/>
        </a>
        <input
          type='text'
          placeholder='Search...'
          className='search_input'
          onInput={e => {
            e.target.value.trim() ?
              setShow(true) :
              setShow(false);
          }}
        />
        <a onClick={resetInput} className={'reset_search ' + className}>X</a>
      </div>
    </div>
  )
};

function resetInput(e) {
  e.preventDefault();
  let searchInput = document.querySelector('.search_input');

  searchInput.value = '';
  searchInput.nextSibling.classList.remove('show');
}

export default HeadLeft;
