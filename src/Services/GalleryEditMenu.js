const GalleryEditMenu = (action, fid, did) => {
  let host = 'https://www.cincopa.com',
      hostUrl = '/media-platform/';

  switch (action) {
    case '1':
      window.location.href = `${host + hostUrl}wizard_style.aspx?fid=${fid}`;
      break;
    case '3':
      window.location.href = `${host + hostUrl}wizard_gettag.aspx?fid= ${fid}`;
      break;
    case '4':
      window.open(hostUrl + "upload-files?fid=" + fid, '_self');
      break;
    case '8':
      window.location.href = `${host}/media-platform/upload-files?fid=${fid}&continue=${encodeURIComponent(window.location.pathname + "?msg=You have added items to - " + did)}`;
      break;
    case 15:
      window.location.href = `https://www.cincopa.com/media-platform/test?fid=${did}`;
  }
};

export default GalleryEditMenu;
