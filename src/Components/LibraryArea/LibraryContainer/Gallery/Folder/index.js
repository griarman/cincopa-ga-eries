import React from 'react';

import GalleryEditMenu from '../../../../../Services/GalleryEditMenu';


import FullAnalitics from './FullAnalitics';
import AllActionsBlock from './AllActionsBlock';
import ItemNameDesc from './ItemNameDesc';
import GalleryItems from './GalleryItems';
import FastAnalytics from './FastAnalytics';

import './style.scss';

const Folder = ({ folderInfo, folderAnalytics, index }) => (
  <>
    <tr
      id={'gallery_' + folderInfo.fid}
      className={'galleryRow library-line ' + folderInfo.loaded}
      data-did={folderInfo.did}
      data-fid={folderInfo.fid}
      data-loaded={true}
      data-index={index}
    >
      <td className="galleryThumb landscape">
        <div
          className="thumb"
          onClick={() => {
            GalleryEditMenu(15, folderInfo.fid, folderInfo.did)
          }}>
          <div className={'img ' + (folderInfo.img === 'Empty Gallery' ? 'loaded empty' : 'loaded')}>
            {folderInfo.img !== 'Empty Gallery' && <a
              dangerouslySetInnerHTML={{__html: folderInfo.img || '<img src="_cms/design20/images/nothumb.png" alt=""/>'}}
            />}
          </div>
        </div>
        <AllActionsBlock
          fid={folderInfo.fid}
          did={folderInfo.did}
          name={folderInfo.name}
        />
      </td>
      <ItemNameDesc
        {...folderInfo}
      />
      <GalleryItems
        {...folderAnalytics}
        items={folderInfo.items}
        details={folderInfo.details}
      />
      <FastAnalytics
        {...folderAnalytics}
      />
    </tr>
    <FullAnalitics {...folderAnalytics} />
  </>
);

export default Folder;
