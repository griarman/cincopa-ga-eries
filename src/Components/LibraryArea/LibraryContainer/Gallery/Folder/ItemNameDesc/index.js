import React from 'react'

import './style.scss'

const ItemNameDesc = ({ name, description, modified, fid }) => (
  <td className='iItem_name_desc'>
    <span className='name filename' title={name} style={{display: 'block'}}>
      <span onClick={() => {}}>{name}</span>
      <a className='changeLink btn trans' onClick={() => {}} title='Edit Title'>
        <i className='icon-edit'/>
      </a>
    </span>
    <div className='changeName' style='display: none;'/>
    <div className='caption' title='no-caption'><i/></div>
    <div className='description edit_desc' title='no-description' data-desc='a gallery'>
      <i style='padding-right: 36px;'>{description || 'no-description'}</i>
      <a className='changeLink btn trans' title='Edit Description'><i className='icon-edit'/></a>
    </div>
    <div className='lastUpdated'>
      <i className='icon-clock'/>
      <div className='date_div'> Last Updated: {modified}</div>
    </div>
    <div className='galleryId'>
      <i className='icon-gall_id'/>
      <div className='galid_div'> Gallery ID: AgOAxkOUud-U</div>
    </div>
    <div className='all_tags'>
      <div className='tags'>
        <input name='tags_main'
               value=''
               id='tags1571748801995'
               style='display: none;'
        />
        <div id='tags1571748801995_tagsinput'
             className='tagsinput'
             style={{
               width: 300 + 'px',
               minHeight: 40 + 'px',
               height: 100 + '%'
             }}
        >
          <div id='tags1571748801995_addTag' style='display: none;'>
            <input id='tags1571748801995_tag' defaultValue='' 
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
);

export default ItemNameDesc;
