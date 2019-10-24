import React from 'react'

const FastAnalytics = ({ hits }) => (
  <td className='fastAnalytics galleryStat'>
    <div></div>
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
);

export default FastAnalytics;