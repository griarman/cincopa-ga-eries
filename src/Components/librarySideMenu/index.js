import React, { Component } from 'react'
import './librarySideMenu.scss'

export default class LibrarySideMenu extends Component {
  render() {
    return (
      <div id='librarySideMenu'>
        <div className='sideMenuControls'>
          <a href="" className='upload_files btn primary'>
            <i className='icon-uploadfiles'></i>
            <b>Upload Files</b>
          </a>
          <a href=""></a>
        </div>
        <div className='all_tags_block'>
          <h4>
            <i className="icon-tags"></i>
            <b>Tags</b>
          </h4>
          <div className="all_tags tagsCloud" id="tagsCloud">
            <ul></ul>
          </div>
        </div>
      </div>
    )
  }
}