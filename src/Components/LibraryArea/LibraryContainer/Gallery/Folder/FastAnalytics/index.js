import React from 'react';
import ReactHighcharts from 'react-highcharts';

const FastAnalytics = ({ hits, days }) => {

  const categoriesDates = days.map(day => day.date);
  const data = days.map(day => day.hits);

  let config = {
    title: {
      text: 'Last Week',
        align: 'left',
        x: 20, //center
        style: {
        color: '#656d78',
          fontWeight: 'bold',
          fontSize: '12px'
      }
    },
    height: '145px',
    subtitle: {
      text: '',
        x: -20
    },
    xAxis: {
      categories: categoriesDates,
        tickPixelInterval: 70,
        type: 'datetime',
        labels: {
        formatter: function () {
          //return Highcharts.dateFormat('%d/%m', this.value); //original code
          let dateVal = new Date(this.value);
          dateVal = dateVal.setDate(dateVal.getDate() + 1);//needed for safari browser & add + one day (not sure why but start from -1 day);
          let myDate = new Date(this.value);
          let day = (myDate.getDate() < 10) ? '0' + myDate.getDate() : myDate.getDate(), month = myDate.getMonth() + 1;
          return `${day}/${month}`;
        }
      }
    },
    yAxis: {
      type: 'linear',
        min: 0,
        title: {
        text: ''
      },
      plotLines: [{
        value: 1,
        width: 1,
        color: '#e2d8ff'
      }]
    },
    tooltip: {
      valueSuffix: '',
        color: '#7d67ae',
        useHTML: true,
        formatter: function (timestamp) {
        let d = new Date(this.x);
        let s = '';
        s += `<b style="color: ${this.points[0].series.color};">${this.x}</b>`;
        this.points.forEach( function (point, i) {
          s += `<b style="color: ${point.series.color};">${point.series.name}: ${point.y}</b>`;
        });
        return s;
      },
      shared: true
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false
    },
    global: {
      useUTC: false
    },
    series: [{
      name: 'Views',
      data,
      color: '#7d67ae',
      lineWidth: 2,
      shadow: false,
      marker: {
        radius: 1,
        states: {
          hover: {
            radius: 2
          }
        }
      }
    }]
  };

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