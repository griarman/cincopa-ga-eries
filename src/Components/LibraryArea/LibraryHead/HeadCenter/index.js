import React from 'react'

import Helpers from '../../../../libs/helpers'
import MyContext from '../../../../Context/MyContext'
import SelectedTag from './SelectedTag'
import HashController from "../../../../libs/hashController";

const HeadCenter = () =>(
  <MyContext.Consumer>
    {({ changeSearchTags, searchTags }) => (
      <div className='headCenter'>
        <span className="cell title"/>
        <div className="tagsFilterBlock">
          {searchTags && searchTags.map(el =>
            <SelectedTag
              el={el}
              key={Helpers.generateRandomNumber()}
              changeSearchTags={changeSearchTags}
              searchTags={searchTags}
              changeHashByTags={changeHashByTags}
            />)}
        </div>
      </div>
    )}
  </MyContext.Consumer>
);

const changeHashByTags = searchTags => {
  let hashString = searchTags.map(tag => encodeURIComponent(tag)).join(',');
  let { hash } = window.location;
  hash = HashController.ParseHash(hash);
  console.log(hash);
  hash.tag = hashString;
  delete hash.tags;
  if (!hashString)
    delete hash.tag;
  window.location.hash = HashController.CollectHash(hash);
};

export default HeadCenter;
