import React, { Component } from 'react';
import LibrarySideMenu from "./Components/LibrarySideMenu";
import LibraryArea from "./Components/LibraryArea";
import AppProvider from './Context/AppProvider';
import './app.scss'

class App extends Component{
  render() {
    return (
      <div className="myContainer">
        <AppProvider>
            <LibrarySideMenu/>
            <LibraryArea/>
        </AppProvider>
      </div>
    );
  }
}
export default App;
