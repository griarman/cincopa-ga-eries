import axios from 'axios';

import { urls } from '../Constants'
import jsonpRequest from './jsonp';

class SearchGalleries {
  static searchInGallery(searchByName, searchByTag, page, per_page, more, hash_changed) {
    let params = {
      disable_editor: true,
      ...(window['gallery_order'] === 'byTraffic' && {
        orderby: 'bylist',
        orderbylist: window['fidlist']
      }),
      ...(window['gallery_order'] === 'byView' && {
        orderby: 'bylist',
        orderbylist: window['fiduserlist']
      }),
      page: page ? page : 1,
      per_page: per_page ? per_page : 50,
      ...(searchByName != null && {search: searchByName}),

    };

    if (searchByTag) {
      if (typeof searchByTag == 'string') {
        params["tags"] = searchByTag;
      }
      if (typeof searchByTag == 'object') {
        params["tags"] = searchByTag.join(',');
      }
    }

    if (more == false) {
      $("#libraryContainer").html('');
    }

    let filter = {};

    //if (params['page'] && params['page'] != 1) filter.page = params['page'];
    if (params['search'] && params['search'] != '') filter.search = params['search'];
    if (params['tags'] && params['tags'] != '') filter.tag = params['tags'];
    if (gallery_order != 'byLastChange') filter.orderby = gallery_order;

    // let new_hash = Filter.set_hash_params(filter);

    //Change url when user just change filter
    // if (!hash_changed && JSON.stringify(Filter.get_hash_param()) !== JSON.stringify(filter)) {
      // Filter.change_url(Filter.current_url() + new_hash);
    // }

    /*axios({
      url: urls.getFoldersWithApiUrl,
      method: "POST",
      cache: false,
      dataType: 'json',
      data: params,
    })*/
/*
    $.ajax({
      url: getFoldersWithApiUrl,
      method: "POST",
      cache: false,
      dataType: 'json',
      data: params,
      success: function (data) {
        galleries(data.response);
        if (searchPressed) {
          if (data.response.folders && data.response.folders.length > 0) {
            sendEventToGTM("Gallery Search", "Search", "Successful", true);
          } else {
            sendEventToGTM("Gallery Search", "Search", "Unsuccessful", true);
          }
        }
        searchPressed = false;

      },
      error: function (err) {
        console.log(err);
      }
    });*/
  }
}

export default SearchGalleries;
