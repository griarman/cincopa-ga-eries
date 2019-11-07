import React, { useContext } from 'react';
import HighCharts from 'react-highcharts'

import Utilities from '../../../../../../../libs/utilities';

import MyContext from '../../../../../../../Context/MyContext';

const LastWeek = ({ fid, state }) => {

  const { foldersWholeData } = useContext(MyContext);
  console.log(foldersWholeData, fid);
  const folder = foldersWholeData.find(folder => folder[0].fid === fid);

    let weeks = folder[1];
    const categoriesDates = weeks.days.map(day => day.date);
    const data = weeks.days.map(day => day.hits);
    const title = 'Last Week';
    const config = Utilities.ChartSettingsGenerator(categoriesDates, data, title);

    return (
      <div className="lwStat statBlock" data-stat="lw" data-view="0" style={{display: state}}>
        <HighCharts config={config} />
      </div>
    )
};

export default LastWeek;
