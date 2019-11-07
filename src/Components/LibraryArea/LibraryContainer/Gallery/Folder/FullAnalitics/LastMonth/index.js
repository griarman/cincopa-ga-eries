import React, { useContext } from 'react';
import HighCharts from 'react-highcharts'

import MyContext from '../../../../../../../Context/MyContext';
import Utilities from '../../../../../../../libs/utilities';

const LastMonth = ({ fid, state }) => {

  const { foldersWholeData } = useContext(MyContext);
  const folder = foldersWholeData.find(folder => folder[0].fid === fid);
  if (folder.length !== 5) {
    return null;
  }
  else {
    let month = folder[3];
    const categoriesDates = month.days.map(day => day.date);
    const data = month.days.map(day => day.hits);
    const title = 'Last Month';
    const config = Utilities.ChartSettingsGenerator(categoriesDates, data, title);
    return (
      <div className="lmStat statBlock" data-stat="lm" data-view="1" style={{display: state}}>
        <HighCharts config={config} />
      </div>
    )
  }
};

export default LastMonth;
