import React from 'react'
import './style.scss'

const dorpdownOrders = [
  {
    id: 1,
    value: 'byLastChange',
    text: 'By Last Change',
  },
  {
    id: 2,
    value: 'byTraffic',
    text: 'By traffic (today)',
  },
  {
    id: 3,
    value: 'byView',
    text: 'By view (today)',
  },

];

const HeadRight = () => (
    <div className='headRight'>
      <select name="" id="dropdownOrder">
        {dorpdownOrders.map(el => <option value={el.value} key={el.id}>{el.text}</option>)}
      </select>
      <span>
        <button className='btn trans bluetext'>
          <i className="icon-refresh" />
          <b>Refresh</b>
        </button>
      </span>
      <div className="last_added_grid_view">
        <a className='normal_view btn trans active'>
          <i className="icon-list" />
        </a>
        <a className='grid_view btn trans'>
          <i className="icon-grid" />
        </a>
      </div>
    </div>
  );

export default HeadRight;