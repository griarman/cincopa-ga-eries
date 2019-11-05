import React, { Component } from 'react';

import Name from './Name';
import Description from './Description';
import Info from './Info';
import AllTags from './AllTags';
import MyContext from '../../../../../../Context/MyContext';
import './style.scss';

class ItemNameDesc extends Component {
  render() {
    const { name, description, modified, fid, did, tags} = this.props;
    const { ManageGalleriesSettings,  apiGetList: { items_data: { tag_cloud: tagCloud } }, changeAllTags }  = this.context;

    return (
      <td className='item_name_desc'>
        <Name
          name={name}
          changeGalleryName={ManageGalleriesSettings.changeGalleryName}
          fid={fid}
        />
        <div className='caption' title='no-caption'><i/></div>
        <Description
          fid={fid}
          description={description}
          saveNewDesc={ManageGalleriesSettings.saveNewDesc}
        />
        <Info
          did={did}
          modified={modified}
        />
        <AllTags
          fid={fid}
          tags={tags}
          tagCloud={tagCloud}
          changeAllTags={changeAllTags}
          setTags={ManageGalleriesSettings.setTags}
        />
        <div className='moreInfo'/>
      </td>
    )
  };
}

ItemNameDesc.contextType = MyContext.Consumer;
export default ItemNameDesc;
