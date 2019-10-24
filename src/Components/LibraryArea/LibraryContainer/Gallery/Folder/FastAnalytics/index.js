import React from 'react'
// import ReactHighcharts from 'react-highcharts'

const FastAnalytics = ({ hits, days }) => {
  const categoriesDates = days.map(day => day.date);
  console.log(categoriesDates);

  return (
  <td className='fastAnalytics galleryStat'>
    <div className='chart'>
      {/*<ReactHighcharts config={}/>*/}
    </div>
    <div className='totalInfo'>
      <div className='statItem traffic'>
        <div>
          <i className="icon-stat_traffic"/>
          <b>{}<small>MB</small></b>
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