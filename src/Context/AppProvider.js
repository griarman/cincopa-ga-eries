import React, { Component } from 'react';
import axios from 'axios'

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
        }
      },
      initialize: false
    }
  }

  componentDidMount() {
    this.getGalleriesFromServer({
     url: urls.analyticsUrl
    });
    this.setState({
      initialize: true
    })
  }

  render() {
    if(!this.state.initialize) return null;
    console.log(this.state);
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

  changeGalleriesFolders = folders => {

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

    if (requireKeys.every(el => Object.keys(params).includes(el))) {

    }
    // axios(params).then(callback);
  }
}



export default AppProvider;
