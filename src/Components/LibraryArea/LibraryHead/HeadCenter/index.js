import React from 'react'

import Helpers from '../../../../libs/helpers'
import MyContext from '../../../../Context/MyContext'
import SelectedTag from './SelectedTag'

const HeadCenter = () =>(
  <MyContext.Consumer>
    {({items_data: { changeSearchTags, searchTags, getGalleriesFromServer} }) => (
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
        {getGalleriesFromServer({
          a: 10,
          b: 35,
          c: 'asdasdas'
        })}
      </div>
    )}
  </MyContext.Consumer>
);

export default HeadCenter;