import React, { Component } from 'react';

import { myApiImitation, urls } from '../Constants';
import MyContext from './MyContext';
import CreateRequest from '../Services/createRequest';
import ManageGalleriesSettings from "../Services/manageGalleriesSettings";


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
      changeAllTags: this.changeAllTags,
      ManageGalleriesSettings: ManageGalleriesSettings,
      searchTags: [],
      foldersWholeData: [],
      initialize: false,
      loading: true,
      loadNewGallery: false
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

    window.addEventListener('hashchange', this.hashChange);

    window.addEventListener('scroll', this.lazyLoad);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    window.removeEventListener('scroll', this.lazyLoad);
  }

  async fetchData(type) {
    await this.elementsLoading;
    const firstFiveGalleries = this.state.api_getList.folders.splice(0, 5);
    return Promise.all(
      firstFiveGalleries.map(el => this.getGallery(el, type))
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

  changeAllTags = newTags => {
    this.setState(prevState => ({
      ...prevState,
      api_getList: {
        ...prevState.api_getList,
        items_data: {
          ...prevState.api_getList.items_data,
          tag_cloud: newTags
        }
      }
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
      case 'update':
        break;
      case 'delete':
        break;
    }
  };

  getGallery = async (el, type) => {
    const getStatuses = (() => {
      const options = {
        url: urls.getStatusUrl,
        data: {
          cmd: 'getstatus',
          fid: el.sysdata.fid,
        },
      };
      // let url = window.location.host === 'localhost:3000' ? window.location.href + urls.getStatusUrl : urls.getStatusUrl;
      return CreateRequest('jsonp', options);
    })();

    const getHitData = (() => {
      const options = {
        url: urls.analyticsUrl,
        data: {
          m: 'hits-urls',
          p: 'lw',
          fid: el.sysdata.did
        },
      };
      // let url = window.location.host === 'localhost:3000' ? window.location.href + urls.analyticsUrl : urls.analyticsUrl;
      return CreateRequest('jsonp', options);
    })();
    const getTraffic = CreateRequest('ajax', {
      url: "//www.cincopa.com/media-platform/api/redis?disable_editor=y&cmd=topfid&stats=fid-traffic-stats&end=-1"
    }).then(({ data }) => data);

    const data = await Promise.all([
      getStatuses,
      getHitData,
      getTraffic,
    ]);
    this.changeGalleriesFolders(data, type);
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
  };

  lazyLoad = async () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 150) {
      const nextGallery = this.state.api_getList.folders.splice(0, 1)[0];

      if (nextGallery && !this.state.loadNewGallery) {
        this.setState(prevState => ({
          ...prevState,
          loadNewGallery: true,
        }));
        await this.getGallery(nextGallery, 'add');
        this.setState(prevState => ({
          ...prevState,
          loadNewGallery: false,
        }));
      }
    }
  };

  hashChange = async () => {
    let params = {
      tags: '',
      page: 1,
      per_page: 50,
      disable_editor: true,
    };
    let { hash } =  window.location;
    hash = hash.slice(1).split('&').reduce((el, next) => {
      let [key, value] = next.split('=');

      el[decodeURIComponent(key) === 'tag' ? 'tags' : decodeURIComponent(key)] = decodeURIComponent(value);
      return el;
    }, {});
    Object.keys(params).forEach(el => {
      if (!(el in hash)) {
        hash[el] = params[el];
      }
    });
    let newApiGetList = await CreateRequest('ajax', {
      url: urls.getFoldersWithApiUrl,
      cache: false,
      method: 'POST',
      data: hash,
    });
    console.log(newApiGetList);
  }
}

export default AppProvider;
