import React from 'react'

import MyContext from '../../../Context/MyContext'
import HeadLeft from './HeadLeft'
import HeadCenter from './HeadCenter'
import HeadRight from './HeadRight'
import './style.scss'

const LibraryHead = () => (
  <MyContext.Consumer>
    {({ searchText }) => (
      <div id='libraryHead' className='library-head hired'>
        <HeadLeft searchText={searchText}/>
        <HeadCenter/>
        <HeadRight/>
      </div>
    )}
  </MyContext.Consumer>
);

export default LibraryHead;