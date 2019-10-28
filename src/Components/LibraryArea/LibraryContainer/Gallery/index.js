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

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      folders: nextProps.folders
    }
  }

  render() {
    return  <>
      {this.state.folders.map(folder =>
        <Folder folderInfo={folder[0]}
                folderAnalytics={folder[1]}
                ManageGalleriesSettings={this.state.ManageGalleriesSettings}
        />)}
      </>
  }
}

export default Gallery;