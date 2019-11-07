export const urls = {
  getStatusUrl: "/media-platform/wizard_edit_ajax.aspx",
  getFoldersWithApiUrl: "/media-platform/my-galleries-getlist",
  analyticsUrl: "//analytics.cincopa.com/api_fid.aspx"
};

export const allActionsBlock = [
  {
    events: 'customize',
    rel: 1,
    className: 'item btn square edit',
    'data-eventname':'Edit Gallery Click',
    i: {
      className: 'icon-gear',
    },
    b: {
      className: 'hint',
      text: 'Customize Gallery',
    }
  },
  {
    events: 'manageFiles',
    rel: 8,
    className: 'item btn square upload',
    'data-eventname':'Upload Files Click',
    i: {
      className: 'icon-upload',
    },
    b: {
      className: 'hint',
      text: 'Manage &amp; Upload Files',
    }
  },
  {
    events: 'embed',
    rel: 3,
    className: 'item btn square embed',
    i: {
      className: 'icon-code',
      'data-eventname': 'Embed Code Click'
    },
    b: {
      className: 'hint',
      text: 'Customize Gallery',
    }
  },
  {
    events: 'showMore',
    className: 'btn square more',
    'data-eventname':'icon-more',
    i: {
      className: 'icon-more',
    },
    b: {
      className: 'hint',
      text: 'More Actions',
    }
  },
];

export const DropDownOptions = [
  {
    rel: 2,
    event: 'duplicate',
    className: 'item' ,
    a: {
      'data-eventname':'Gallery Duplicate',
      i: {
        className: 'icon-duplicate'
      },
      b: {
        text: 'Duplicate'
      }
    },
  },
  {
    rel: 4,
    event: 'textRecorder',
    className: 'item' ,
    a: {
      i: {
        className: 'icon-sort'
      },
      b: {
        text: 'Text &amp; Reorder'
      }
    },
  },
  {
    rel: 5,
    event: 'reSync',
    className: 'item' ,
    a: {
      'data-eventname': 'Gallery Resync Click',
      i: {
        className: 'icon-resync'
      },
      b: {
        text: 'Resync'
      }
    },
  },
  {
    rel: 9,
    event: 'duplicateSettings',
    className: 'item' ,
    a: {
      i: {
        'data-eventname': 'Gallery Duplicate Settings Only',
        className: 'icon-resync'
      },
      b: {
        text: 'Duplicate (Settings only)'
      }
    },
  },
  {
    rel: 6,
    event: 'download',
    className: 'item' ,
    a: {
      i: {
        'data-eventname': 'Download Gallery Click',
        className: 'icon-download'
      },
      b: {
        text: 'Download gallery'
      }
    },
  },
  {
    rel: 7,
    event: 'deleteGallery',
    className: 'item' ,
    a: {
      className: 'delete',
      i: {
        className: 'icon-delete'
      },
      b: {
        text: 'Delete gallery'
      }
    },
  },
];