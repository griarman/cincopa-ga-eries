import React, { Component } from 'react';

import { myApiImitation, urls } from '../Constants';
import MyContext from './MyContext';
import CreateRequest from '../Services/createRequest';
import ManageGalleriesSettings from "../Services/manageGalleriesSettings";
import HashController from '../libs/hashController';


class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiGetList: {
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
      noResult: false,
      searchText: '',
    };

    this.elementsLoading = null;
    this.timer = 0;
  }

  async componentDidMount() {
    if (!window.location.hash.length) {
      this.elementsLoading = this.waitForElement();
      await this.fetchData('add');
      this.setState({
        initialize: true,
      });
    }
    else {
      await this.hashChange();
      this.setState({
        initialize: true,
      });
    }

    window.addEventListener('hashchange', this.hashChange);
    window.addEventListener('scroll', this.asyncGetGalleries);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    window.removeEventListener('scroll', this.asyncGetGalleries);
  }

  async fetchData(type) {
    await this.elementsLoading;
    const firstFiveGalleries = this.state.apiGetList.folders.splice(0, 5);
    /*const getTraffic = CreateRequest('ajax', {
      url: "//www.cincopa.com/media-platform/api/redis?disable_editor=y&cmd=topfid&stats=fid-traffic-stats&end=-1"
    }).then(({ data }) => data);*/
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
      apiGetList: {
        ...prevState.apiGetList,
        items_data: {
          ...prevState.apiGetList.items_data,
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
      case 'empty':
        this.setState(prevState => ({
          ...prevState,
          foldersWholeData: []
        }));
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
      return CreateRequest('jsonp', options);
    })();

    const data = await Promise.all([
      getStatuses,
      getHitData,
    ]);
    this.changeGalleriesFolders(data, type);
  };

  waitForElement = () => {
    return new Promise(resolve => {
      if (typeof window['api_getlist'] !== "undefined") {
        return this.setState({
          apiGetList: window['api_getlist'].response,
        }, resolve);
      }
      else if (window.location.host === 'localhost:3000') {
        return this.setState({
          apiGetList: myApiImitation.response,
        }, resolve);
      }
      this.timer = setTimeout(this.waitForElement, 100);
    });
  };

  asyncGetGalleries = async () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 300) {

      const nextGallery = this.state.apiGetList.folders.shift();

      if (nextGallery) {
        this.setState({
          loadNewGallery: true,
        });

        await this.getGallery(nextGallery, 'add');

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

    hash = HashController.ParseHash(hash);

    Object.keys(params).forEach(el => {
      if (!(el in hash)) {
        hash[el] = params[el];
      }
    });
    if (hash.orderby && hash.orderby ==='byTraffic') {
      hash.orderby = 'bylist';
      // hash.orderbylist =
    }
    else if (hash.orderby && hash.orderby ==='byView') {
      hash.orderby = 'bylist';
      // hash.orderbylist =
    }

    let formData = new FormData();
    Object.keys(hash).forEach(el => {
      formData.append(el, hash[el]);
    });



    let newApiGetList = await CreateRequest('ajax', {
      url: urls.getFoldersWithApiUrl,
      cache: false,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    });

    this.changeGalleriesFolders(null, 'empty');

    const noResult = !newApiGetList.data.response.folders.length;
    const searchTags = hash.tags ? hash.tags.split(',') : [];

    await this.setState({
      noResult,
      searchTags,
      initialize: false,
      apiGetList: newApiGetList.data.response,
      searchText: hash.search ? hash.search : '',
    });

    await this.fetchData('add');
    this.setState({
      initialize: true,
    })
  }
}

export default AppProvider;
