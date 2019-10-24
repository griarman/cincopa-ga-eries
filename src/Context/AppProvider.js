import React, { Component } from 'react';
import axios from 'axios';

import { myApiImitation, urls } from '../Constants';
import MyContext from './MyContext';
import jsonpRequest from '../libs/jsonp';

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api_getList: {
        items_data: {},
        calldata: {},
        folders: [],
        result: 'no',
        runtime: 0,
      },
      changeSearchTags: this.changeSearchTags,
      getGalleriesFromServer: this.getGalleriesFromServer,
      searchTags: [],
      foldersWholeData: [],
      initialize: false,
      loading: true,
    };
    this.elementsLoading = null;
    this.timer = 0;
  }

  async componentDidMount() {
    this.elementsLoading = this.waitForElement();
    await this.fetchData('add');
    this.setState({
      initialize: true,
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  async fetchData(type) {
    await this.elementsLoading;
    return Promise.all(
      this.state.api_getList.folders.map(async el => {
        const getStatuses = (() => {
          const options = {
            cmd: 'getstatus',
            fid: el.sysdata.fid
          };
          // let url = window.location.host === 'localhost:3000' ? window.location.href + urls.getStatusUrl : urls.getStatusUrl;
          return jsonpRequest(urls.getStatusUrl, options);
        })();

        const getHitData = (() => {
          const options = {
            m: 'hits-urls',
            p: 'lw',
            fid: el.sysdata.did
          };
          // let url = window.location.host === 'localhost:3000' ? window.location.href + urls.analyticsUrl : urls.analyticsUrl;
          return jsonpRequest(urls.analyticsUrl, options);
        })();
        const getTraffic = axios({
          url: "//www.cincopa.com/media-platform/api/redis?disable_editor=y&cmd=topfid&stats=fid-traffic-stats&end=-1"
        }).then(({ data }) => data);

        const data = await Promise.all([
          getStatuses,
          getHitData,
          getTraffic,
        ]);
        this.changeGalleriesFolders(data, type);
      })
    );
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
        return this.setState({
          api_getList: window['api_getlist'].response,
        }, resolve);
      }
      else if (window.location.host === 'localhost:3000') {
        return this.setState({
          api_getList: myApiImitation.response,
        }, resolve);
      }
      this.timer = setTimeout(this.waitForElement, 100);
    });
  }
}

export default AppProvider;
