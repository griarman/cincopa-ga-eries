import Helpers from '../libs/helpers'
import createRequest from './createRequest'
import { urls } from '../Constants'

class ManageGalleriesSettings {
  static saveNewDesc(fid, newDesc) {
    newDesc = !newDesc.trim() ? 'no-description' : Helpers.htmlEntities(newDesc.trim());
    return createRequest({
      type: 'POST',
      url: '/media-platform/wizard_edit_ajax.aspx',
      dataType: 'html',
      data: {
        cmd: 'setfoldermeta',
        fid: fid,
        folder_description: newDesc,
      },
    }, 'ajax');
  }

  static changeGalleryName(fid, name) {
    const hostUrl = path.indexOf('media-platform') === -1 ? '/media-platform/' : '';
    let url = hostUrl + "wizard_edit_ajax.aspx?cmd=setfoldername&fid=" + fid + "&newname=" + name;
    window['sendEventToGTM']("Gallery Meta", "Title Change", "", true);
    window['AjaxGetData'](url);
  }

  static setTags(fid, tags) {
    return jsonpRequest(urls.getStatusUrl, {
      fid,
      tags,
      cmd: 'setfoldertags',
    });
  }
}

export default ManageGalleriesSettings;