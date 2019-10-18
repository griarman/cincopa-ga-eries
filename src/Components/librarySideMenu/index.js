import React from 'react'

import Helpers from '../../libs/helpers'
import MyContext from '../../Context/MyContext'
import './librarySideMenu.scss'

const LibrarySideMenu = () => (
  <MyContext.Consumer>
    {({ items_data: { tag_cloud: tagCloud, changeSearchTags, searchTags } }) => (
        <div id='librarySideMenu'>
          <div className='sideMenuControls'>
            <a href='' className='upload_files btn primary'>
              <i className='icon-uploadfiles'/>
              <b>Upload Files</b>
            </a>
            <a href=''/>
          </div>
          <div className='all_tags_block'>
            <h4>
              <i className='icon-tags'/>
              <b>Tags</b>
            </h4>
            <div className='all_tags tagsCloud' id='tagsCloud'>
              <ul>
                {Object.keys(tagCloud).map(el =>
                  <li
                    key={Helpers.generateRandomNumber()}
                    data-val={el}
                    onClick={e => {selectByTag(e, changeSearchTags, searchTags)}}
                  >
                    {el + '(' + tagCloud[el] + ')'}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
  </MyContext.Consumer>
);

const selectByTag = (e, changeSearchTags, searchTags) => {
  let value = e.target.dataset.val;
  if (!searchTags.includes(value)) {
    searchTags.push(value);
    changeSearchTags(searchTags);
  }
};

export default LibrarySideMenu;