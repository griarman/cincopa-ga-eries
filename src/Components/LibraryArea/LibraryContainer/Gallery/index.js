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
    return  <tbody>{this.state.folders.map(el => <Folder {...el} />)}</tbody>;

  }


}

export default Gallery;