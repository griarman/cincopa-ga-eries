import React, { Fragment } from 'react'

import AllActionsBlock from './AllActionsBlock'
import ItemNameDesc from './ItemNameDesc'
import './style.scss'

const Folder = props => (
  <Fragment key={props.fid}>
    <tr
      id={'gallery_' + props.fid}
      className={'galleryRow library-line ' + props.loaded}
      data-did={props.did}
      data-loaded={props.loaded}
    >
      <td className='galleryThumb landscape'>
        <div className='thumb'>
          <div className={'img' + props.imgLoaded}>
            <a dangerouslySetInnerHTML={{__html: 5 > 1/* kataka, kdzem*/ ? props.img : '<img src="_cms/design20/images/nothumb.png" alt=""/>'}}/>
          </div>
        </div>
        <AllActionsBlock/>
      </td>
      <ItemNameDesc { ...props }/>
      <td className='galleryItems'></td>
      <td className='fastAnalytics galleryStat'></td>

    </tr>
    <tr>

    </tr>
  </Fragment>
);

export default Folder;
