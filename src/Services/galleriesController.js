import axios from 'axios';

import jsonpRequest from "./jsonp";
import { urls } from '../Constants'

class GalleriesController {
  static duplicate_gallery(fid, galleryName, settingsOnly = false) {
    const url =  settingsOnly ?
      encodeURI("https://api.cincopa.com/v2/gallery.create.json?api_token=session&template=" + fid + "&name=duplicate of " + galleryName + "&copy_args=" + fid)
      :
      encodeURI("https://api.cincopa.com/v2/gallery.create.json?api_token=session&template=" + fid + "&name=duplicate of " + galleryName + "&copy_args=" + fid + "&copy_items=" + fid);

    return new Promise(resolve => {
      jsonpRequest(url, {}).then(({ success, fid }) => {
        if (!success) {
          setTimeout(() => {
            window['masterGalleryModal']('Failed to copy.');
          }, 1500);
        }
        else {
          jsonpRequest(urls.getStatusUrl, {
            cmd: 'getstatus',
            fid,
          }).then(resolve)
        }
      })
    })
  }

  static deleteFolderWithAssets(fid) {
    const url = `https://api.cincopa.com/v2/gallery.delete.json?api_token=session&fid=${fid}&delete_assets=yes`;
    return jsonpRequest(url, {})
  }

  static resyncFolder(fid) {
    const hostUrl = path.indexOf('media-platform') === -1 ? '/media-platform/' : '',
          url = `${hostUrl}wizard_edit_ajax.aspx?cmd=resync&fid=${fid}`;

    window['AjaxGetData'](url);
    setTimeout(GalleriesController.updateStatus(fid), 1000);
  }

  static updateStatus(fid) {
    const hostUrl = path.indexOf('media-platform') === -1 ?  '/media-platform/' : '',
          url = hostUrl + "wizard_edit_ajax.aspx?cmd=getstatus&fid=" + fid;

    window['AjaxGetData'](url);
  }

}

export default GalleriesController;
