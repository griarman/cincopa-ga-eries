import React from 'react';

import Domains from './Domains';

import './style.scss';

const DomainsList = ({ domains, uniqueDomainsList, domainState, fid }) => (
  <div className={'itemsDropdown domainsList ' +  (domainState ? 'openedList' : '')} >
    <div className='itemsDropdown_head' >
      <div className='headLeft'>
        <h3>{!domains ? 'This gallery is not embedded' : 'Domains used (# of views)'}</h3>
      </div>
    </div>
    <div className='itemsDropdown_items' >
      {!uniqueDomainsList.length ?
        <div className='emptyDomains'>
          <a onClick={() => {
            window.location.href = `https://www.cincopa.com/media-platform/wizard_gettag.aspx?fid=${fid}#html`
          }}
          >
            Click here
          </a>
          to grab the embed code
        </div>
        :
        <ul>
          {uniqueDomainsList.map(domain =>
            <Domains
              key={domain.url}
              {...domain}
            />)}
        </ul>
      }
    </div>
  </div>
);

export default DomainsList;