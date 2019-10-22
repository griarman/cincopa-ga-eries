import React from 'react'

import AllActionsBlock from './AllActionsBlock'
import './style.scss'

const Folder = ({fid, did, loaded, imgLoaded, img}) => (
  [
    <tr
      id={'gallery_' + fid}
      className={'galleryRow library-line ' + loaded}
      data-did={did}
      data-loaded={loaded}
    >
      <td className='galleryThumb landscape'>
        <div className='thumb'>
          <div className={'img' + imgLoaded}>
            <a dangerouslySetInnerHTML={{__html: !imgLoaded ? img : '<img src="_cms/design20/images/nothumb.png" alt=""/>'}}/>
          </div>
        </div>
        <AllActionsBlock/>
      </td>
      <td className='item_name_desc'></td>
      <td className='galleryItems'></td>
      <td className='fastAnalytics galleryStat'></td>

    </tr>,
    <tr>

    </tr>
  ]
);

export default Folder;
