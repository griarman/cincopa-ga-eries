class Utilities {
  static ChartSettingsGenerator = (categoriesDates, data, title = 'Last Week', height = false) => {
    let config = {
      title: {
        text: title,
        align: 'left',
        x: 20, //center
        style: {
          color: '#656d78',
          fontWeight: 'bold',
          fontSize: '12px'
        }
      },
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

    if (height) {
      config.chart = {
        height
      };
    }
    return config;
  };
}



export default Utilities;