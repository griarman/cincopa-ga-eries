import CreateRequest from './createRequest';
import GalleryInfo from './getGalleryInfo';

import { urls } from '../Constants';

class GalleriesController {
  static async duplicateGallery(fid, galleryName, settingsOnly = false) {
    console.log(galleryName);
    const url =  'https://api.cincopa.com/v2/gallery.create.json';
    let data = {
      api_token: 'session',
      template: fid,
      name: `duplicate of ${galleryName}`,
      copy_args: fid,
    };

    if (settingsOnly) data.copy_items = fid;

    const { success, newFid = fid } = await CreateRequest('jsonp', {
      url,
      data,
    });

    if (!success) {
      setTimeout(() => {
        window['masterGalleryModal']('Failed to copy.');
      }, 1500);
    }
    else {
      const getStatuses = await CreateRequest('jsonp', {
        url: urls.getStatusUrl,
        data:{
          cmd: 'getstatus',
          fid: newFid,
        },
      });

      const getHitData = await CreateRequest('jsonp', {
        url: urls.analyticsUrl,
        data: {
          m: 'hits-urls',
          p: 'lw',
          fid: getStatuses.did,
        },
      });

      return Promise.all([
        getStatuses,
        getHitData,
      ]);
    }
  }

  static deleteFolderWithAssets(fid) {
    const url = `https://api.cincopa.com/v2/gallery.delete.json`;
    return CreateRequest('jsonp', {
      url,
      data: {
        api_token: 'session',
        fid: fid,
        delete_assets: 'yes',
      }
    });
  }

  static resyncFolder(fid) {
    const hostUrl = window.location.pathname.indexOf('media-platform') === -1 ? '/media-platform/' : '',
          url = `${hostUrl}wizard_edit_ajax.aspx`;

    setTimeout(GalleriesController.updateStatus(fid), 1000);
    return CreateRequest('jsonp', {
      url,
      callBackName: 'json_callback',
      data: {
        cmd: 'resync',
        fid: fid
      },
    });
  }

  static updateStatus(fid) {
    const hostUrl = window.location.pathname.indexOf('media-platform') === -1 ?  '/media-platform/' : '',
          url = `${hostUrl}wizard_edit_ajax.aspx`;

    return CreateRequest('jsonp', {
      url,
      callBackName: 'json_callback',
      data: {
        cmd: 'getstatus',
        fid: fid
      },
    });
  }

}

export default GalleriesController;
