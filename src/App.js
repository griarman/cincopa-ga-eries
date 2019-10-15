import React from 'react';
import LibrarySideMenu from "./Components/LibrarySideMenu";
import LibraryArea from "./Components/LibraryArea";
import './app.scss'

function App() {
  return (
    <div className="myContainer">
      <LibrarySideMenu />
      <LibraryArea />
    </div>
  );
}

export default App;
