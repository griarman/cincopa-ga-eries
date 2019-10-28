import jsonpRequest from './jsonp'

class ManageMastersGalleries {
  static getMasterGalleryThumb(fid) {
    // $(".master-galleries-list li[data-fid='" + fid + "'] ").addClass('loading');
    // console.log('getMasterGalleryThumb');
    return jsonpRequest('/media-platform/wizard_edit_ajax.aspx', {
      cmd: 'getstatus',
      fid
    });
  }

  static setMasterGallery(fid, masterFid) {
    const url = fid ?
      `https://api.cincopa.com/v2/gallery.set_master.json?api_token=session&fid=${fid}&master=${masterFid}`
      :
      `https://api.cincopa.com/v2/gallery.set_master.json?api_token=session&master=${masterFid}`;

    return jsonpRequest(url, {});
  }

  static getMasterGalleryData(mFid, fid) {
    return jsonpRequest('/media-platform/wizard_edit_ajax.aspx', {
      cmd: 'getstatus',
      fid: mFid
    });
  }

  static galleryPageAjaxGetData(url) {

    return jsonpRequest(url, {});
  }

}

export default ManageMastersGalleries;