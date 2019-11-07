import React, { Component } from 'react';

import { urls } from '../Constants';

import MyContext from './MyContext';

import CreateRequest from '../Services/createRequest';
import GalleryInfo from '../Services/getGalleryInfo';

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
    window.removeEventListener('hashchange', this.hashChange);
  }

  async fetchData(type) {
    await this.elementsLoading;
    const firstFiveGalleries = this.state.apiGetList.folders.splice(0, 5);
    /*const getTraffic = CreateRequest('ajax', {
      url: "//www.cincopa.com/media-platform/api/redis?disable_editor=y&cmd=topfid&stats=fid-traffic-stats&end=-1"
    }).then(({ data }) => data);*/
    return Promise.all(
      firstFiveGalleries.map(el => this.getGallery(el, type)),
    );
  }

  changeSearchTags = newSearchTags => {
    this.setState({
      searchTags: newSearchTags,
    });
  };

  changeAllTags = newTags => {
    this.setState(prevState => ({
      apiGetList: {
        ...prevState.apiGetList,
        items_data: {
          ...prevState.apiGetList.items_data,
          tag_cloud: newTags,
        },
      },
    }));
  };

  changeGalleriesFolders = (foldersData, type = 'add', beforeElement = false) => {
    switch (type) {
      case 'add':
        if (!beforeElement) {
          this.setState(prevState => ({
            foldersWholeData: [
              ...prevState.foldersWholeData,
              foldersData,
            ]
          }));
        }
        else {
          let { foldersWholeData } = this.state;
          if (beforeElement === 0)
            foldersWholeData.unshift(foldersData);
          else
            foldersWholeData.splice(beforeElement - 1, 0, foldersData);
          this.setState({ foldersWholeData });
        }
        break;
      case 'update':

        break;
      case 'empty':
        this.setState({
          foldersWholeData: [],
        });
        break;
      case 'delete':
        this.setState({
          foldersWholeData: foldersData,
        });
        break;
    }
  };

  getGallery = async (el, type) => {
    const data = await GalleryInfo.getGallery(el);
    this.changeGalleriesFolders(data, type);
  };

  waitForElement = () => {
    return new Promise(resolve => {
      if (typeof window['api_getlist'] !== "undefined") {
        return this.setState({
          apiGetList: window['api_getlist'].response,
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
    let { hash } = window.location;

    hash = HashController.ParseHash(hash);

    Object.keys(params).forEach(el => {
      if (!(el in hash)) {
        hash[el] = params[el];
      }
    });
    if (hash.orderby && hash.orderby === 'byTraffic') {
      hash.orderby = 'bylist';
      // hash.orderbylist =
    }
    else if (hash.orderby && hash.orderby === 'byView') {
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
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    });

    this.changeGalleriesFolders(null, 'empty');

    const noResult = !newApiGetList.data.response.folders.length;
    const searchTags = hash.tags ? hash.tags.split(',') : [];

    this.setState({
      noResult,
      searchTags,
      initialize: false,
      apiGetList: newApiGetList.data.response,
      searchText: hash.search || '',
    }, async () => {
      await this.fetchData('add');
      this.setState({
        initialize: true,
      });
    });
  };

  render() {
    if (!this.state.initialize) return null;
    const value = {
      ...this.state,
      changeSearchTags: this.changeSearchTags,
      changeAllTags: this.changeAllTags,
      changeGalleriesFolders: this.changeGalleriesFolders,
    };

    return (
      <MyContext.Provider value={value}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default AppProvider;
