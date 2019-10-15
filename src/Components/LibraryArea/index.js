import React, { Component } from 'react'
import LibraryHead from './LibraryHead'
import LibraryContainer from './LibraryContainer'
import LoadMore from './LoadMore'
import './libraryArea.scss'

export default class LibraryArea extends Component {
  render() {
    return (
      <div className='libraryArea galleriesArea loading'>
        <LibraryHead />
        <LibraryContainer />
        <LoadMore />
      </div>
    )
  }
}