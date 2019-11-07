import React, { useContext } from 'react';
import HighCharts from 'react-highcharts'

import MyContext from '../../../../../../../Context/MyContext';
import Utilities from '../../../../../../../libs/utilities';

const LastYear = ({ fid, state }) => {

  const { foldersWholeData } = useContext(MyContext);
  const folder = foldersWholeData.find(folder => folder[0].fid === fid);
  if (folder.length !== 5) {
    return null;
  }
  else {
    let years = folder[4];
    const categoriesDates = years.days.map(day => day.date);
    const data = years.days.map(day => day.hits);
    const title = 'Last Month';
    const config = Utilities.ChartSettingsGenerator(categoriesDates, data, title);
    return (
      <div className="lyStat statBlock" data-stat="ly" data-view="2" style={{display: state}}>
        <HighCharts config={config} />
      </div>
    )
  }
};

export default LastYear;
