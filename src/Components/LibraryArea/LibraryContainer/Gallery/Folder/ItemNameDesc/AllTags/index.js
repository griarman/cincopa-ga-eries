import React from 'react'

import './style.scss'

const AllTags = ({ tags }) => {
  return (
    <>
      <div className='all_tags'>
        <div className='tags'>
          <input name='tags_main'
                 value={tags}
                 id='tags1571748801995'
                 style={{display: 'none'}}
          />
          <div id='tags1571748801995_tagsinput'
               className='tagsinput'
               style={{
                 width: 300 + 'px',
                 minHeight: 40 + 'px',
                 height: 100 + '%'
               }}
          >
            {tags && tags.split(',').map(tag =>
              <span className='tag'>
                    <span>{tag}</span>
                    <a title="Removing tag" className="removeTag" href="javascript:void(0)">x</a>
                  </span>
            )}
            <div id='tags1571748801995_addTag' style={{display: 'none'}}>
              <input
                id='tags1571748801995_tag'
                defaultValue=''
                data-default='Add new tag'
                style={{
                  color: 'rgb(102, 102, 102)',
                  width: 84 + 'px'
                }}
              />
            </div>
            <div className='tags_clear'/>
          </div>
        </div>
        <a href='javascript:void(0)' className='selectTags'>Add new tag</a>
      </div>
    </>
  )
};

export default AllTags;