import React from 'react'

const Domains = () => (
  <li>
    <div className='domains expandable'>
      <div>
        <a className='domainname'>{}</a>
        <i>{}</i>
        <div>
          <div className='urlList' style={{ display: 'none' }}>
            <a className='domainpage'>{}</a>
            <i style={{ display: 'inline' }}>Total vies: {}</i>
          </div>
        </div>
      </div>
    </div>
  </li>
);

export default Domains;