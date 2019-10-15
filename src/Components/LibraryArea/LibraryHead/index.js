import React, { Component } from 'react'
import HeadLeft from './HeadLeft'
import HeadRight from './HeadRight'

export default class LibraryHead extends Component {
  render() {
    return (
      <div id='libraryHead' className='library-head hired'>
        <HeadLeft/>
        <HeadRight/>
      </div>
    )
  }
}