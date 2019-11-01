import React, { Component } from 'react';

import Name from './Name';
import Description from './Description';
import MyContext from '../../../../../../Context/MyContext';
import './style.scss';

class ItemNameDesc extends Component {
  render() {
    const { name, description, modified, fid, did, tags} = this.props;
    const { ManageGalleriesSettings } = this.context;

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
        <div className='lastUpdated'>
          <i className='icon-clock'/>
          <div className='date_div'> Last Updated: {modified.split(' ')[0]}</div>
        </div>
        <div className='galleryId'>
          <i className='icon-gall_id'/>
          <div className='galid_div'> Gallery ID: {did}</div>
        </div>
        <div className='all_tags'>
          <div className='tags'>
            <input name='tags_main'
                   value={tags}
                   id='tags1571748801995'
                   style={{display: 'none'}}
            />
            <div id='tags1571748801995_tagsinput'
                 className='tagsinput'
                 style={{
                   width: 300 + 'px',
                   minHeight: 40 + 'px',
                   height: 100 + '%'
                 }}
            >
              {tags && tags.split(',').map(tag =>
                  <span className='tag'>
                    <span>{tag}</span>
                    <a title="Removing tag" className="removeTag" href="javascript:void(0)">x</a>
                  </span>
              )}
              <div id='tags1571748801995_addTag' style={{display: 'none'}}>
                <input
                  id='tags1571748801995_tag'
                  defaultValue=''
                  data-default='Add new tag'
                  style={{
                    color: 'rgb(102, 102, 102)',
                    width: 84 + 'px'
                  }}
                />
              </div>
              <div className='tags_clear'/>
            </div>
          </div>
          <a href='javascript:void(0)' className='selectTags'>Add new tag</a>
        </div>
        <div className='moreInfo'/>
      </td>
    )
  };

  cancelDescChange = () => {
    this.setState({
      descChanger: this.state.descChanger.reverse()
    })
  }
}

ItemNameDesc.contextType = MyContext.Consumer;
export default ItemNameDesc;
