import React, { useContext, useEffect } from 'react';

import GalleriesController from '../../../../../../../../Services/galleriesController';

import MyContext from '../../../../../../../../Context/MyContext';

const Option = ({ fid, name, a, event, rel, className, index }) => {

  let elements = {};
  const { changeGalleriesFolders } = useContext(MyContext);
  const handleEvents = {
    duplicate: {
      onClick: async () => {
        const data = await GalleriesController.duplicateGallery(fid, name, true);
        changeGalleriesFolders(data, 'add', elements[index].closest('tr').dataset.index);
      },
    },
    textRecorder: {
      onClick: e => {
      }
    },
    reSync: {
      onClick: e => GalleriesController.resyncFolder(fid),
    },
    duplicateSettings: {
      onClick: e => {
        const data = GalleriesController.duplicateGallery(fid, name);

      },
    },
    download: {
      onClick: e => {
      }
    },
    deleteGallery: {
      onClick: e => {
      }
    },
  };

  useEffect(() => {

  });

  return (
    <li
      className={className}
      rel={rel}
      {...handleEvents[event]}
      ref={node => elements[index] = node}
    >
      <a data-eventname={a['data-eventname'] || ''}
         className={a.className || ''}
      >
        <i className={a.i.className}
           data-eventname={a.i['data-eventname'] || ''}
        />
        <b>{a.b.text}</b>
      </a>
    </li>
  );

};

export default Option;
