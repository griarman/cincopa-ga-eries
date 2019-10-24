import React, { Fragment } from 'react'

import AllActionsBlock from './AllActionsBlock'
import ItemNameDesc from './ItemNameDesc'
import GalleryItems from './GalleryItems'
import FastAnalytics from './FastAnalytics'
import './style.scss'

const Folder = ({ folderInfo, folderAnalytics }) => (
  <Fragment key={folderInfo.fid}>
    <tr
      id={'gallery_' + folderInfo.fid}
      className={'galleryRow library-line ' + folderInfo.loaded}
      data-did={folderInfo.did}
      data-loaded={folderInfo.loaded}
    >
      <td className='galleryThumb landscape'>
        <div className='thumb'>
          <div className={'img' + folderInfo.imgLoaded}>
            <a dangerouslySetInnerHTML={{__html: 5 > 1/* kataka, kdzem*/ ? folderInfo.img : '<img src="_cms/design20/images/nothumb.png" alt=""/>'}}/>
          </div>
        </div>
        <AllActionsBlock fid={ folderInfo.fid }
                         did={ folderInfo.did }
        />
      </td>
      <ItemNameDesc { ...folderInfo } />
      <GalleryItems { ...folderAnalytics }
                    items={ folderInfo.items }
                    details={ folderInfo.details }

      />
      <FastAnalytics { ...folderAnalytics }/>

    </tr>
    <tr { ...folderAnalytics }>

    </tr>
  </Fragment>
);

export default Folder;
