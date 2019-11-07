import React from 'react';
import ReactHighcharts from 'react-highcharts';

import Utilities from '../../../../../../libs/utilities';

const FastAnalytics = ({ hits, days }) => {

  const categoriesDates = days.map(day => day.date);
  const data = days.map(day => day.hits);

  let config = Utilities.ChartSettingsGenerator(categoriesDates, data, 'Last Week', 145);

  return (
  <td className='fastAnalytics galleryStat'>
      <ReactHighcharts config={config} />
    <div className='totalInfo'>
      <div className='statItem traffic'>
        <div>
          <i className="icon-stat_traffic"/>
          <b>0<small>MB</small></b>
        </div>
        <div>Today's Traffic</div>
      </div>
      <div className='statItem weekly totalView'>
        <div className='weekly_views'>
          <i className="icon-stat_views"/>
          <b>{hits}</b>
        </div>
        <div>Weekly views</div>
      </div>
      <div className='statItem more' >
        <div><i className="icon-stat_more" /></div>
        <div>More Analytics</div>
      </div>
    </div>
  </td>
)};

export default FastAnalytics;