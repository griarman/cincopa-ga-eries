import React, { memo } from 'react';

import MyContext from '../../../../Context/MyContext';

import Folder from './Folder';

import './style.scss';

const Gallery = memo(() => (
  <MyContext.Consumer>
    {({ foldersWholeData }) => (
        foldersWholeData.map((folder, index) => (
          <Folder
            key={folder[0].fid}
            index={index}
            folderInfo={folder[0]}
            folderAnalytics={folder[1]}
          />
        ))
      )
    }
  </MyContext.Consumer>
));

export default Gallery;
