import React, { Component } from 'react';
import axios from 'axios'

import { myApiImitation, urls } from '../Constants/index';
import MyContext from './MyContext';
import jsonpRequest from '../libs/jsonp'


class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api_getList: {
        items_data: {},
        calldata: {},
        folders: [],
        result: 'no',
        runtime: 0
      },
      changeSearchTags: this.changeSearchTags,
      getGalleriesFromServer: this.getGalleriesFromServer,
      searchTags: [],
      foldersWholeData: [],
      initialize: false,
      loading: true,
    };
  }

  componentDidMount() {
    this.waitForElement().then(() => {
      let allDataPromise = this.state.api_getList.folders.map(el => {
        return new Promise(res => {
          let promises = [];
          let firstPromise = new Promise(resolve => {
            let options = {
              cmd: 'getstatus',
              fid: el.sysdata.fid
            };
            // let url = window.location.host === 'localhost:3000' ? window.location.href + urls.getStatusUrl : urls.getStatusUrl;
            jsonpRequest(urls.getStatusUrl, options).then(data => resolve(data));
          });

          let secondPromise = new Promise(resolve => {
            let options = {
              m: 'hits-urls',
              p: 'lw',
              fid: el.sysdata.did
            };
            // let url = window.location.host === 'localhost:3000' ? window.location.href + urls.analyticsUrl : urls.analyticsUrl;
            jsonpRequest(urls.analyticsUrl, options).then(data => resolve(data));
          });
          let thirdPromise = new Promise((resolve, reject) => {
            axios({
              url: "//www.cincopa.com/media-platform/api/redis?disable_editor=y&cmd=topfid&stats=fid-traffic-stats&end=-1"
            }).then(data => {
              resolve(data) })
              .catch(data => reject(data))
          });

          promises.push(firstPromise);
          promises.push(secondPromise);
          promises.push(thirdPromise);
          Promise.all(promises).then(data => {
            this.changeGalleriesFolders(data);
            res();
          })
        });
      });
      Promise.all(allDataPromise).then(() => {
        this.setState({
          initialize: true
        });
      });
    })
  }

  render() {
    if(!this.state.initialize) return null;
    return (
      <MyContext.Provider value={this.state}>
        {this.props.children}
      </MyContext.Provider>
    );
  }

  changeSearchTags = newSearchTags => {
    this.setState(prevState => ({
      ...prevState,
      searchTags: newSearchTags
    }));
  };

  changeGalleriesFolders = (foldersData, type = 'add') => {
    switch (type) {
      case 'add':
        this.setState(prevState => ({
            ...prevState,
            foldersWholeData: [
              ...prevState.foldersWholeData,
              foldersData
            ]
          }));
        break;
    }
  };

  getGalleriesFromServer = (params)=> {
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

   jsonpRequest(params.url, params.data).then(data => {
      this.changeGalleriesFolders(data);
    });
  };

  waitForElement = () => {
    return new Promise(resolve => {
      if (typeof window['api_getlist'] !== "undefined") {
       this.setState({
          api_getList: window['api_getlist'].response,
        }, () => resolve());
       return;
      }
      else if (window.location.host === 'localhost:3000') {
        this.setState({
          api_getList: myApiImitation.response,
        }, () => resolve());
        return;
      }
      setTimeout(this.waitForElement, 100);
    })
  }
}

export default AppProvider;
