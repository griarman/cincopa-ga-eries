import {urls} from '../Constants';

import CreateRequest from './createRequest';

class GalleryInfo {
  static getGallery(el) {
    const getStatuses = (() => {
      const options = {
        url: urls.getStatusUrl,
        data: {
          cmd: 'getstatus',
          fid: el.sysdata.fid,
        },
      };
      return CreateRequest('jsonp', options);
    })();

    const getHitData = (() => {
      const options = {
        url: urls.analyticsUrl,
        data: {
          m: 'hits-urls',
          p: 'lw',
          fid: el.sysdata.did,
        },
      };
      return CreateRequest('jsonp', options);
    })();

    return Promise.all([
      getStatuses,
      getHitData,
    ]);
  }
}

export default GalleryInfo;
