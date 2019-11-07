import React, { Component } from 'react';

class FullAnalytics extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr
        id={`fullAnalytics_${this.props.fid}`}
        className={'analyticsDropdown fullAnalytics tabbed-area'}
        data-fid={this.props.fid}
        data-did={this.props.did}
      >
        <td colspan="4">
          <div className="itemsDropdown_items domainsList">

          </div>
          <div className="content box-wrap">
            <div className="itemsDropdown_head">
              <a
                href="javascript:void(0)"
                onClick={() => {
                }}
                className="btn trans"
              >
                <i className="icon-close"/>
              </a>
              <div className="headLeft tabs group">
                <button className="btn toggle active" data-tab="1">Weekly</button>
                <button className="btn toggle " data-tab="2">Monthly</button>
                <button className="btn toggle " data-tab="3">All-time</button>
                <button className="btn toggle report_csv cp_disabled" data-tab="4">
                  <i className="icon-excel"/>
                  <b>Export</b>
                </button>
              </div>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

export default FullAnalytics;
