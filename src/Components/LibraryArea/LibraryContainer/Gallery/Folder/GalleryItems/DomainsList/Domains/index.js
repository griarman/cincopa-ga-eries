import React from 'react'

import Helpers from '../../../../../../../../libs/helpers'

const Domains = ({ url, hits }) => (
  <li>
    <div className='domains expandable'>
      <div>
        <a className='domainname'>{Helpers.extractHostname(url)}</a>
        <i>{hits}</i>
        <div>
          <div className='urlList' style={{ display: 'none' }}>
            <a className='domainpage'>{url}</a>
            <i style={{ display: 'inline' }}>Total views: {hits}</i>
          </div>
        </div>
      </div>
    </div>
  </li>
);

export default Domains;