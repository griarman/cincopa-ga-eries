import React from 'react'

import LibraryHead from './LibraryHead'
import LibraryContainer from './LibraryContainer'
import LoadMore from './LoadMore'
import MyContext from '../../Context/MyContext'
import './style.scss'

const LibraryArea = () => (
  <MyContext.Consumer>
    {({ loading }) => (
      <div className={'libraryArea galleriesArea ' + (!loading) ? 'loading' : ''}>
        <LibraryHead/>
        <LibraryContainer/>
        <LoadMore/>
      </div>
    )}
  </MyContext.Consumer>
);

export default LibraryArea;