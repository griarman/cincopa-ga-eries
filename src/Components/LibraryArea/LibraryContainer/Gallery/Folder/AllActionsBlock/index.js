import React, { useState } from 'react'

import DropDown from './DropDown'
import { allActionsBlock } from '../../../../../../Constants'
import GalleryEditMenu from '../../../../../../libs/GalleryEditMenu'
import './style.scss'

const AllActionsBlock = ({ fid, did }) => {

  const [dropDownState, setDropDownState] = useState(false);
  const handleEvents = {
    showMore: {
      onClick: () => { setDropDownState(!dropDownState) },
      onMouseLeave: () => {
        if (dropDownState) {
          setTimeout(() => {
            setDropDownState(false);
          }, 700);
        }
      }
    },
    customize: {
      onClick: e => { GalleryEditMenu(e.currentTarget.rel, fid, did) }
    },
    manageFiles: {
      onClick: e => { GalleryEditMenu(e.currentTarget.rel, fid, did) }
    },
    embed: {
      onClick: e => { GalleryEditMenu(e.currentTarget.rel, fid, did) }
    }
  };

return (
    <div className="all_actions_block">
      {allActionsBlock.map(action =>
        (<a key={action.rel}
            className={action.className}
            data-eventname={action['data-eventname'] ? action['data-eventname'] : ''}
            rel={action.rel ? action.rel : ''}
            {...handleEvents[action.events]}

          >
            <i className={action.i.className}
               data-eventname={action.i['data-eventname'] ? action.i['data-eventname'] : ''}
            />
            <b className={action.b.className}>{action.b.text}</b>
          </a>
        )
      )}
      <DropDown open={dropDownState}/>
    </div>
)};

export default AllActionsBlock;
