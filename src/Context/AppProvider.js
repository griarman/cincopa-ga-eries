import React, { Component } from 'react';
import axios from 'axios-jsonp-pro'

import Helpers from '../libs/helpers'
import { myApiImitation, urls} from '../Constants/index';
import MyContext from './MyContext';

let app_getList = 'app_getlist' in Window ? window.app_getlist.response :  myApiImitation.response;


class AppProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      app_getList: {
        ...app_getList,
        items_data: {
          ...app_getList.items_data,
          changeSearchTags: this.changeSearchTags,
          getGalleriesFromServer: this.getGalleriesFromServer,
          searchTags: []
        },
        foldersWholeData: [],
      },
      initialize: false,
    }
  }

  componentDidMount() {
    let promises = [];
    this.state.app_getList.folders.forEach(el => {
      let promise = new Promise(response => {
        this.getGalleriesFromServer({
          url: urls.getStatusUrl,
          method: "POST",
          cache: false,
          dataType: 'jsonp',
          data: {
            cmd: 'getstatus',
            fid: el.sysdata.fid
          },
        });
      });
     promises.push(promise);
    });
    this.setState({
      initialize: true
    });

  }

  render() {
    if(!this.state.initialize) return null;
    return (
      <MyContext.Provider value={this.state.app_getList}>
        {this.props.children}
      </MyContext.Provider>
    );
  }

  changeSearchTags = newSearchTags => {
    this.setState(prevState => ({
      ...prevState,
      app_getList: {
        ...prevState.app_getList,
        items_data: {
          ...prevState.app_getList.items_data,
          searchTags: newSearchTags
        }
      }
    }));
  };

  changeGalleriesFolders = (foldersData, type = 'add') => {
    switch (type) {
      case 'add':
        this.setState(prevState => (
          {
            ...prevState,
            app_getList: {
              ...prevState.app_getList,
              foldersWholeData: [
                ...prevState.app_getList.foldersWholeData,
                foldersData
              ]
            }

          }
        ), () => console.log(this.state));
        break;
    }
  };

  getGalleriesFromServer = (params )=> {
    const requireKeys = ['url', 'method'];
    let searchCriterisKeys = {
      disable_editor: true,
      orderby: '',
      orderbylist: '',
      page: 1,
      per_page: 50,
      search: '',
      tags: '',
    };
    // if (requireKeys.every(el => Object.keys(params).includes(el))) {}

   this.doRequest('https://www.cincopa.com' + params.url, params.data).then(data => {
      this.changeGalleriesFolders(data);
    });
  };

  doRequest = (origin, params) => {
    return new Promise((resolve, reject) => {
      let query = '?';
      const callbackName = `JQuery${Helpers.getRandomString()}`;

      Object.entries(params).forEach(([key, value]) => {
        query += `${key}=${encodeURIComponent(value)}&`;
      });

      query +=`callback=${callbackName}`;

      const script = document.createElement('script');
      script.src = `${origin}${query}`;

        window[callbackName] = function(res) {
          document.body.removeChild(script);
          delete window[callbackName];
          resolve(res);
        };

      document.body.appendChild(script);
    })
  }
}

export default AppProvider;
