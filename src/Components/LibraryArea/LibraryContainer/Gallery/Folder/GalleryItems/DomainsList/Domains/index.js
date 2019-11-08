import React, { useState } from 'react'

import Helpers from '../../../../../../../../libs/helpers'

const Domains = ({ url, hits }) => {
  const [open, setOpen] = useState('none');
  return (
    <li>
      <div className='domains expandable'>
        <div>
          <a
            onClick={e => {
              e.stopPropagation();
              setOpen(!open)
            }}
            className='domainname'
          >{Helpers.extractHostname(url)}</a>
          <i onClick={e => {
            e.stopPropagation();
            setOpen(!open)
          }}
          >{hits}</i>
          <div>
            <div className='urlList' style={{ display: open }}>
              <a className='domainpage'>{url}</a>
              <i style={{ display: 'inline' }}>Total views: {hits}</i>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Domains;