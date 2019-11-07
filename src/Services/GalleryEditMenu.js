const GalleryEditMenu = (action, fid, did) => {
  let settings_only = false,
      path = window.location.pathname,
      host = 'https://www.cincopa.com',
      hostUrl;

  hostUrl = '/media-platform/';
  switch (action) {
    case '0':
      break;
    case '1':
      // window.open(hostUrl + "wizard_style.aspx?fid=" + fid, '_self');
      window.location.href = `${host + hostUrl}wizard_style.aspx?fid=${fid}`;
      break;
    case '3':
      // window.open(hostUrl + "wizard_gettag.aspx?fid=" + fid, '_self');
      // console.log(hostUrl);
      // console.log(window.location.pathname);
      window.location.href = `${host + hostUrl}wizard_gettag.aspx?fid= ${fid}`;
      break;
    case '4':
      window.open(hostUrl + "upload-files?fid=" + fid, '_self');
      break;
    case '5':
      // resync_folder(fid);
      break;
    case '6':
      // if (__user_feature['ui-assets-allow-download'].value === 'true') {
      //   window.open('//www.cincopa.com/media-platform/download.aspx?fid=' + fid);
      // } else {
        // openFeaturesModal(__user_feature['ui-assets-allow-download'].upgrade_text);
      // }
      break;
    case '7':
      // delete_folder(fid);
      break;
    case '8':
      // window.open("/media-platform/upload-files?fid=" + fid + "&continue=" + encodeURIComponent(window.location.pathname + "?msg=You have added items to - " + did), '_self');
      window.location.href = `${host}/media-platform/upload-files?fid=${fid}&continue=${encodeURIComponent(window.location.pathname + "?msg=You have added items to - " + did)}`;
      break;
    case '9':
      // window.open(hostUrl + "wizard_style.aspx?fid=new&defskin=" + did, '_self');
      settings_only = true;
      // duplicate_gallery(fid, settings_only);
      break;
    case '10':
      // openDeleteModal(fid);
      break;
    case '11':
      // setGalleryAsMaster(fid)
    /*case '12':
      if (typeof wordpressEmbedHref != "undefined") {
        let url = wordpressEmbedHref.replace("fidtorelace", did)
        window.open(url, "_self")
      }
    case '13':
      if (isFromMoodle) {
        sendEventToMoodle({
          action: "insert-moodle-gallery",
          fid: did
        });
        window.close()
      }
      break;
    case '14':
      if (isFromDrupal) {
        sendEventToDrupal({
          action: "insert-drupal-gallery",
          fid: did
        });
        window.close()
      }
      break;*/
    case 15:
      window.location.href = `https://www.cincopa.com/media-platform/test?fid=${did}`;
  }
};

export default GalleryEditMenu;
