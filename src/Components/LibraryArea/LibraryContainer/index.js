import React, { Component } from 'react'
import MyContext from '../../../Context/MyContext'

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
      // folders: this.context.folders,
      folders: [],
      initialize: true
    })
  }

  render() {
    if(!this.state.initialize) return null;
    // let component = !this.state.folders.length ?
    return (
        <table id='libraryContainer' className='hided libraryContainer galleriesList galleries_list'>
          {}
        </table>
    )
  }
}

LibraryContainer.contextType = MyContext;
export default LibraryContainer;