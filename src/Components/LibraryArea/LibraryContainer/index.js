import React, { Component } from 'react'

import MyContext from '../../../Context/MyContext'
import Gallery from './Gallery'
import EmptyContainer from './EmptyContainer'
import './style.scss'

class LibraryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      initialize: false,
    }
  }

  componentDidMount() {
    this.setState({
      folders: this.context.foldersWholeData,
      initialize: true,
    })
  }

  render() {
    if(!this.state.initialize) return null;
    const { foldersWholeData: folders } = this.context;
    let component = !folders.length ? <EmptyContainer/> : <Gallery folders={folders}/>;
    return (
      <table id='libraryContainer' className='hided libraryContainer galleriesList galleries_list'>
        <tbody>
        { component }
        </tbody>
      </table>
    )
  }
}

LibraryContainer.contextType = MyContext.Consumer;
export default LibraryContainer;