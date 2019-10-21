import React from 'react'

import HeadLeft from './HeadLeft'
import HeadCenter from './HeadCenter'
import HeadRight from './HeadRight'
import './style.scss'

const LibraryHead = () => (
  <div id='libraryHead' className='library-head hired'>
    <HeadLeft/>
    <HeadCenter/>
    <HeadRight/>
  </div>
);

export default LibraryHead;