import React, { memo } from 'react';

import MyContext from '../../../../Context/MyContext';

import Folder from './Folder';

import './style.scss';

const Gallery = memo(() => (
  <MyContext.Consumer>
    {({ foldersWholeData, toggleFullAnalytics }) => (
        foldersWholeData.map((folder, index) => (
          <Folder
            key={folder[0].fid}
            index={index}
            folderInfo={folder[0]}
            folderAnalytics={folder[1]}
            fullAnalyticsOpen={folder[2]}
            toggleFullAnalytics={toggleFullAnalytics}
          />
        ))
      )
    }
  </MyContext.Consumer>
));

export default Gallery;
