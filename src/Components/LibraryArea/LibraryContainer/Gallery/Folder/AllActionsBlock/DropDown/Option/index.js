import React, { Component } from 'react';

import GalleriesController from '../../../../../../../../Services/galleriesController';

import MyContext from '../../../../../../../../Context/MyContext';

class Option extends Component {
  constructor(props) {
    super(props);
    const { fid, name } = props;
    // const { changeGalleriesFolders } = this.context;
    // console.log(changeGalleriesFolders);
    this.handleEvents = {
      duplicate: {
        onClick: async () => {
          const data = await GalleriesController.duplicateGallery(fid, name, true);
          // console.log(changeGalleriesFolders);
        },
      },
      textRecorder: {
        onClick: e => {
        }
      },
      reSync: {
        onClick: e => GalleriesController.resyncFolder(fid),
      },
      duplicateSettings: {
        onClick: e => {
          const data = GalleriesController.duplicateGallery(fid, name);

        },
      },
      download: {
        onClick: e => {
        }
      },
      deleteGallery: {
        onClick: e => {
        }
      },
    };
  }
  render() {
    console.log(this.context, 2);
    return (
      <li
        className={this.props.className}
        rel={this.props.rel}
        {...this.handleEvents[this.props.event]}
      >
        <a data-eventname={this.props.a['data-eventname'] || ''}
           className={this.props.a.className || ''}
        >
          <i className={this.props.a.i.className}
             data-eventname={this.props.a.i['data-eventname'] || ''}
          />
          <b>{this.props.a.b.text}</b>
        </a>
      </li>
    );
  }
}

Option.contextType = MyContext.Consumer;
export default Option;
