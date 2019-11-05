import React, { useState } from 'react'

import DropDown from './DropDown'
import { allActionsBlock } from '../../../../../../Constants'
import GalleryEditMenu from '../../../../../../Services/GalleryEditMenu'
import './style.scss'
import Buttons from "./Buttons";

const AllActionsBlock = ({ fid, did }) => {

  const [dropDownState, setDropDownState] = useState(false);
  const [timer, setTimer]= useState(null);
  const handleEvents = {
    showMore: {
      onClick: () => { setDropDownState(!dropDownState) },
      /*onMouseLeave: () => {
        if (dropDownState) {
          let newTimer = setTimeout(() => {
            setDropDownState(false);
          }, 700);
          setTimer(newTimer)
        }
      }*/
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
        <Buttons
          key={action.rel}
          action={action}
          handleEvents={handleEvents}
        />
      )}
      <div
        className="overLine"
        onClick={() => {
          setDropDownState(!dropDownState)
        }}
        style={{display: dropDownState ? 'block' : 'none'}}
      />
      <DropDown
        open={dropDownState}
        timer={timer}
      />
    </div>
)};

export default AllActionsBlock;
