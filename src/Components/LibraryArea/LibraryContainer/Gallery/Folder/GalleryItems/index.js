import React from 'react'

const GalleryItems = props => {

  const { days, items } = props;
  let domains = 0;
  days.forEach(el => { domains += el.urls.length });

  return (
    <td className='galleryItems'>
      <div>
        <div className='galleryDomains' onClick={() => {}}>
          <i className="icon-domain"/>
          <span>
            <b>{domains}</b> domains
        </span>
        </div>
        <div className='galleryFiles' onClick={() => {}}>
          <i className="icon-folder"/>
          <span>
            <b>{items}</b> items
          </span>
        </div>
      </div>
    </td>
  );
};

export default GalleryItems;