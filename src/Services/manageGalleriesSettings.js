import Helpers from '../libs/helpers'
import createRequest from './createRequest';
import { urls } from '../Constants';

class ManageGalleriesSettings {
  static saveNewDesc(fid, newDesc) {
    newDesc = !newDesc.trim() ? 'no-description' : Helpers.htmlEntities(newDesc.trim());
    return createRequest('jsonp', {
      url: '/media-platform/wizard_edit_ajax.aspx',
      callbackName: 'json_callback',
      data: {
        cmd: 'setfoldermeta',
        fid: fid,
        folder_description: newDesc,
      },
    });
  }

  static changeGalleryName(fid, name) {
    const hostUrl = window.location.hostname.indexOf('media-platform') === -1 ? '/media-platform/' : '';
    let url = hostUrl + "wizard_edit_ajax.aspx";
    window['sendEventToGTM']("Gallery Meta", "Title Change", "", true);
    let data = {
      fid,
      cmd: 'setfoldername',
      newname: name,
    };
    return createRequest('jsonp', {
      url,
      data,
      callbackName: 'json_callback',
    })
  }

  static setTags(fid, tags) {
    return createRequest('jsonp', {
      url: urls.getStatusUrl,
      data: {
        fid,
        tags,
        cmd: 'setfoldertags',
      },
    });
  }
}

export default ManageGalleriesSettings;
