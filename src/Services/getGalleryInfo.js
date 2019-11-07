import {urls} from '../Constants';

import CreateRequest from './createRequest';

class GalleryInfo {
  static getGallery(el) {
    const getStatuses = CreateRequest('jsonp', {
        url: urls.getStatusUrl,
        data: {
          cmd: 'getstatus',
          fid: el.sysdata.fid,
        },
      });


    const getHitData = this.getHitData(el.sysdata.did);

    return Promise.all([
      getStatuses,
      getHitData,
    ]);
  }
  static getHitData(fid, p = 'lw') {
    return CreateRequest('jsonp', {
      url: urls.analyticsUrl,
      data: {
        fid,
        p,
        m: 'hits-urls',
      },
    });
  }
}

export default GalleryInfo;
