import React from 'react'

import Helpers from '../../../../libs/helpers'
import MyContext from '../../../../Context/MyContext'
import SelectedTag from './SelectedTag'

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
            />)}
        </div>
      </div>
    )}
  </MyContext.Consumer>
);

export default HeadCenter;