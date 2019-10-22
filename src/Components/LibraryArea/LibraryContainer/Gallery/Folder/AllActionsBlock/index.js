import React from 'react'

import DropDown from './DropDown'
import { allActionsBlock } from '../../../../../../Constants'
import './style.scss'

const AllActionsBlock = () => (

  <div className="all_actions_block">
    {/*<a rel="1"
       className="item btn square edit"
       data-eventname="Edit Gallery Click">
      <i className="icon-gear"/>
      <b className="hint">Customize Gallery</b>
    </a>
    <a rel="8"
       className="item btn square upload"
       data-eventname="Upload Files Click">
      <i className="icon-upload"/>
      <b className="hint">Manage &amp; Upload Files</b>
    </a>
    <a rel="3"
       className="item btn square embed">
      <i className="icon-code" data-eventname="Embed Code Click"/>
      <b className="hint">Embed Gallery</b>
    </a>
    <a className="btn square more">
      <i className="icon-more"/>
      <b className="hint">More Actions</b>
    </a>*/}

    {allActionsBlock.map(action => {
      return <a className={action.className}
                data-eventname={action['data-eventname']? action['data-eventname'] : ''}
                rel={action.rel ? action.rel : ''}
      >
        <i className={action.i.className}
           data-eventname={action.i['data-eventname']? action.i['data-eventname'] : ''}/>
        <b className={action.b.className}>{action.b.text}</b>
      </a>
    })}
    {/*<DropDown/>*/}
  </div>
);

export default AllActionsBlock;
