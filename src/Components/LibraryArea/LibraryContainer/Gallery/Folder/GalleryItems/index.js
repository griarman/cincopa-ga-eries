import React, { useState } from 'react'

import Domains from './Domains'

const GalleryItems = props => {

  const { days, items } = props;
  const [domainState, setDomainState] = useState('none');
  let domains = 0, domainsList, uniqueDomainsList;
  days.forEach(el => { domains += el.urls.length });

  domainsList = days.reduce((list, { urls }) => {
    if (!urls.length) return list;
    list.push(...urls);
    return list;
  }, []);
  console.log(domainsList, 'domainList');

  uniqueDomainsList = domainsList.reduce((list, item) => {
    if(!list.length) return item;
    let newList;
    isNaN(newList = list.find(el => el.url === item.url)) ? list.push(item) : list[newList].hits += item.hits;
    return list;
  }, []);

  console.log(uniqueDomainsList, 'uniqueDomainsList');

  return (
    <td className='galleryItems'>
      <div>
        <div className='galleryDomains' onClick={() => { setDomainState(domainState === 'none' ? 'block' : 'none') }}>
          <i className='icon-domain'/>
          <span>
            <b>{domains}</b> domains
        </span>
          <div className='itemsDropdown domainsList' style={{ display: domainState }}>
            <div className='itemsDropdown_head' style={{ display: domainState }}>
              <div className='headLeft'>
                <h3>{!domains ? 'This gallery is not embedded' : 'Domains used (# of views)'}</h3>
              </div>
            </div>
            <div className='itemsDropdown_items' style={{ display: domainState }}>
              {!domains ?
                <div className='emptyDomains'>
                  <a>Click here</a> to grab the embed code
                </div>
                :
                <ul>
                  {domainsList.map(domain => <Domains key={domain} domain={domain}/>)}
                </ul>
              }
            </div>
          </div>
        </div>
        <div className='galleryFiles' onClick={() => {}}>
          <i className='icon-folder'/>
          <span>
            <b>{items}</b> items
          </span>
        </div>
      </div>
    </td>
  );
};

export default GalleryItems;