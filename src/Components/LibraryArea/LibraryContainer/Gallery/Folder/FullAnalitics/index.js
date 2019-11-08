import React, { useState } from 'react';

import LastWeek from './LastWeek';
import LastMonth from './LastMonth';
import LastYear from './LastYear';

const FullAnalytics = ({ fid, did, fullAnalyticsOpen, toggleFullAnalytics }) => {
  const [state, changeState] = useState(['block', 'none', 'none']);
  return (
    <tr
      id={`fullAnalytics_${fid}`}
      className={'analyticsDropdown fullAnalytics tabbed-area'}
      data-fid={fid}
      data-did={did}
      style={{display: fullAnalyticsOpen}}
    >
      <td colSpan="4">
        <div className="itemsDropdown_items domainsList">
          <ul>
            <li className="total">
              <div className="counter">
                <div>*</div>
              </div>
              <div className="domains">
                <div><a className="domainname">Total views</a><i>0</i></div>
              </div>
            </li>
          </ul>
        </div>
        <div className="content box-wrap">
          <div className="itemsDropdown_head">
            <a
              href="javascript:void(0)"
              onClick={() => {
                console.log(fullAnalyticsOpen);
              }}
              className="btn trans"
            >
              <i className="icon-close" />
            </a>
            <div className="headLeft tabs group">
              <button
                className={`btn toggle ${state[0] === 'block' ? 'active' : ''}`}
                data-tab="1"
                onClick={() => {
                  changeState(['block', 'none', 'none'])
                }}
              >Weekly</button>
              <button
                className={`btn toggle ${state[1] === 'block' ? 'active' : ''}`}
                data-tab="2"
                onClick={() => {
                  changeState([ 'none', 'block', 'none'])
                }}
              >Monthly</button>
              <button
                className={`btn toggle ${state[2] === 'block' ? 'active' : ''}`}
                data-tab="3"
                onClick={() => {
                  changeState([ 'none', 'none', 'block'])
                }}
              >
                All-time
              </button>
              <button
                className={`btn toggle report_csv ${window['__user_feature']['analytics-monthly'].value === "false" ? "cp_disabled" : ""}`}
                data-tab="4"
                onClick={() => {}}
              >
                <i className="icon-excel" />
                <b>Export</b>
              </button>
            </div>
          </div>
          <LastWeek
            state={state[0]}
            fid={fid}
          />
          <LastMonth
            state={state[1]}
            fid={fid}
          />
          <LastYear
            state={state[2]}
            fid={fid}
          />
        </div>
      </td>
    </tr>
  );
};

export default FullAnalytics;
