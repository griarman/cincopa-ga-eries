import React from 'react'
import './'

export default function(props) {
  return (
    <div className="headLeft">
      <div className="searchBox">
        <a href="" className="search_img btn trans">
          <i className="icon-search"/>
        </a>
        <input type="text" placeholder="Search..."  className="search_input"/>
        <a href="javascript:void(0)" className="reset_search">X</a>
      </div>
    </div>
  )
}