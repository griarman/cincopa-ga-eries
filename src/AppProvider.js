import React from 'react';
import { myApiImitation } from './Constants';
import MyContext from './MyContext';
let app_getList = /*app_getlist || */myApiImitation;


const AppProvider = props => {
    return (
      <MyContext.Provider value={app_getList}>
        {props.children}
      </MyContext.Provider>
    );
};
export default AppProvider;

