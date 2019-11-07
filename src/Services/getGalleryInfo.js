import {urls} from '../Constants';

import CreateRequest from './createRequest';

class GalleryInfo {
  static getGallery(el) {
    const getStatuses = (() => {
      return CreateRequest('jsonp', {
        url: urls.getStatusUrl,
        data: {
          cmd: 'getstatus',
          fid: el.sysdata.fid,
        },
      });
    })();

    const getHitData = (() => {
      return CreateRequest('jsonp', {
        url: urls.analyticsUrl,
        data: {
          m: 'hits-urls',
          p: 'lw',
          fid: el.sysdata.did,
        },
      });
    })();

    return Promise.all([
      getStatuses,
      getHitData,
    ]);
  }
}

export default GalleryInfo;
