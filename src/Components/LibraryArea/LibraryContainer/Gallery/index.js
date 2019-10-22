import React, { Component } from 'react'

import Folder from './Folder'
import './style.scss'

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: props.folders,
    }
  }

  render() {
    console.log(this.state.folders[0]);
    return  <div>{this.state.folders.map(folder => <Folder { ...folder }/>)}</div>
  }
}

export default Gallery;