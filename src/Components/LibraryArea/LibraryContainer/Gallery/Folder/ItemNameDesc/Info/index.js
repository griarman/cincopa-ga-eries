import React from 'react'

const Info = ({ modified, did }) => (
  <>
    <div className='lastUpdated'>
      <i className='icon-clock'/>
      <div className='date_div'> Last Updated: {modified.split(' ')[0]}</div>
    </div>
    <div className='galleryId'>
      <i className='icon-gall_id'/>
      <div className='galid_div'> Gallery ID: {did}</div>
    </div>
  </>
);

export default Info;