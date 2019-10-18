import React from 'react'

import './headLeft.scss'

const HeadLeft = () =>
  (
    <div className='headLeft'>
      <div className='searchBox'>
        <a className='search_img btn trans'>
          <i className='icon-search'/>
        </a>
        <input
          type='text'
          placeholder='Search...'
          className='search_input'
          onInput={showDelButton}
        />
        <a onClick={resetInput} className='reset_search'>X</a>
      </div>
    </div>
  );

function resetInput(e) {
  e.preventDefault();
  let searchInput = document.querySelector('.search_input');

  searchInput.value = '';
  searchInput.nextSibling.classList.remove('show');
}

function showDelButton(e) {
  let resetSearch = document.querySelector('.reset_search');
  if (e.target.value.trim()) resetSearch.classList.add('show');
  else resetSearch.classList.remove('show');
}

export default HeadLeft;
