import React from 'react'

import './style.scss'

const DropDown = () => (
  <div className="itemsDropdown noheader actionsMenu" style="display: none;">
    <div className="itemsDropdown_items" style="display: none;">
      <ul className="controls">
        <li className="item" rel="2">
          <a data-eventname="Gallery Duplicate">
            <i className="icon-duplicate"/>
            <b>Duplicate</b>
          </a>
        </li>
        <li className="item" rel="4">
          <a>
            <i className="icon-sort"/>
            <b>Text &amp; Reorder</b>
          </a>
        </li>
        <li className="item" rel="5">
          <a data-eventname="Gallery Resync Click">
            <i className="icon-resync"/>
            <b>Resync</b>
          </a>
        </li>
        <li className="item" rel="9">
          <a>
            <i className="icon-template" data-eventname="Gallery Duplicate Settings Only"/>
            <b>Duplicate (Settings only)</b>
          </a>
        </li>
        <li className="item" rel="6">
          <a>
            <i className="icon-download" data-eventname="Download Gallery Click"/>
            <b>Download gallery</b>
          </a>
        </li>
        <li className="item" rel="7">
          <a className="delete">
            <i className="icon-delete"/>
            <b>Delete gallery</b>
          </a>
        </li>
      </ul>
    </div>
  </div>
);

export default DropDown;