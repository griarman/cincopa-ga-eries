import React from 'react'
import './style.scss'

const EmptyContainer = () => (
  <tr className='galleryRow library-line'>
    <td className='createGalleryNow'>
      <div>
        <p>
          <img src="/_cms/design15/images/nogalleries.png" alt="folder"/>
        </p>
        <h2>You haven't created any galleries yet</h2>
        <p>
          <a href="//www.cincopa.com/media-platform/start.aspx" className='btn green'>
            <i className="icon-new"/>
            <b>Create your first gallery</b>
          </a>
        </p>
      </div>
    </td>
  </tr>
);

export default EmptyContainer;