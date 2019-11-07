import React, { useContext } from 'react';

import GalleriesController from '../../../../../../../../Services/galleriesController';

import MyContext from '../../../../../../../../Context/MyContext';

const Option = ({ fid, name, a, event, rel, className, index, closeDropDown }) => {

  let elements = {};
  const { changeGalleriesFolders, foldersWholeData } = useContext(MyContext);
  const handleEvents = {
    duplicate: {
      onClick: async () => {
        const data = await GalleriesController.duplicateGallery(fid, name, true);
        changeGalleriesFolders(data, 'add', elements[index].closest('tr').dataset.index);
        closeDropDown();
      },
    },
    textRecorder: {
      onClick: () => {
        window.location.href = `https://www.cincopa.com/media-platform/upload-files?fid=${fid}`;
      }
    },
    reSync: {
      onClick: e => GalleriesController.resyncFolder(fid),
    },
    duplicateSettings: {
      onClick: async () => {
        const data = await GalleriesController.duplicateGallery(fid, name);
        changeGalleriesFolders(data, 'add', elements[index].closest('tr').dataset.index);
        closeDropDown();
      },
    },
    download: {
      onClick: () => {
        if (window['__user_feature']['ui-assets-allow-download'].value === 'true') {
          window.location.href = `//www.cincopa.com/media-platform/download.aspx?fid=${fid}`;
        } else {
          alert(window['__user_feature']['ui-assets-allow-download'].upgrade_text);
        }
      }
    },
    deleteGallery: {
      onClick: async () => {
        const { result } = await GalleriesController.deleteFolderWithAssets(fid);
        if (result === 'ok') {
          const data = foldersWholeData.filter(folder => folder[0].fid !== fid);
          changeGalleriesFolders(data, 'delete');
          closeDropDown();
        }
      }
    },
  };

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
