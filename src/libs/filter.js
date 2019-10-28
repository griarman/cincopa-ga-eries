/*
function FilterClass() {
  var self = this;

  self.hash = {};
  self.dparams = {
    search: false,
    orderby: 'byLastChange',
    tag: false,
    page: 1,
    onpage: 50
  };

  /!** Search input **!/
  // self.search_input = $('#search_text');
  // self.search_button = $('#search_btn');
  // self.search_clear = $('#reset_search');
  // self.tagsCloud = $('#tagsCloud');
  // self.order = $('#dropdownOrder');

  //Initial function for main params
  self.init = function () {
    self.parse_params();
  };


  /!**
   *  Work with URL parameters
   **!/

  self.parse_params = function (string) {
    var parsed = {};
    if (string) {

      var string = string.split('&');

      for (var i = 0, el; i < string.length; i++) {
        el = string[i].split('=')
        parsed[el[0]] = el[1];
      }
    }

    return parsed;
  };
  self.filter_url_params = function (params, dparams, exept) {
    var result = {};
    for (var name in params) {
      if ((params[name]
        && dparams[name] !== params[name])
        && $.inArray(name, exept) === -1) {
        result[name] = params[name];
      }
    }
    return result;
  };

  self.get_all_params = function (params, dparams) {
    let result = {};
    Object.keys(dparams).forEach(name => {
      result[name] = params[name] ? params[name] : dparams[name];
    });
    return result;
    // for (var name in dparams) {
    //   if (params[name]) {
    //     result[name] = params[name];
    //   } else {
    //     result[name] = dparams[name];
    //   }
    // }
    // return result;
  };

  self.get_hash_param = function (name, string) {
    if (!string) string = window.location.hash;

    var string = string.replace(/^#/, '');
    if (name) {
      var params = self.parse_params(string);
      if (params[name]) {
        return decodeURIComponent(params[name]);
      } else {
        return params[name];
      }
    }
    var params = self.parse_params(string);
    for (var n in params) {
      params[n] = decodeURIComponent(params[n]);
    }
    return params;
  }

  self.set_hash_param = function (name, value, string) {
    if (!string) string = window.location.hash;

    var params = {};
    var string = string.replace(/^#/, '');

    if (string) {
      var params = self.parse_params(string);
    }

    params[name] = value;
    var result = '';
    for (var param in params) {
      result += '&' + param + '=' + encodeURIComponent(params[param]);
    }
    result = '#' + result.replace(/^&/, '');

    return result;
  }

  self.set_hash_params = function (object, hash) {
    if (!hash) hash = window.location.hash;

    var params = {};
    var hash = hash.replace(/^#/, '');

    if (hash) {
      var params = self.parse_params(hash);
    }

    var result = '';
    for (var param in object) {
      result += '&' + param + '=' + encodeURIComponent(object[param]);
    }
    result = '#' + result.replace(/^&/, '');

    return result;
  }

  self.remove_hash_param = function (name, string) {
    if (!string) string = window.location.hash;

    var params = {};
    if (string) {

      var string = string.replace(/^#/, '');
      var params = self.parse_params(string);
    }

    var result = '';

    if (params) {
      for (let param in params) {
        if (name != param) {
          result += '&' + param + '=' + encodeURIComponent(params[param]);
        }
      }
    }

    result = '#' + result.replace(/^&/, '');

    return result;
  };

  self.current_url = function () {
    return window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '') + window.location.pathname + window.location.search;
  };

  self.current_hash = function () {
    return (window.location.hash ? window.location.hash : '#');
  };

  self.change_url = function (url) {
    let url = url || self.current_url() + self.current_hash();
    let state = {page: url};
    let title = $('title').html();
    history.pushState(state, title, url);
    window.history.go(1);
  }
}/
*/
