import React from 'react'

const SelectedTag = ({ el: tagName, changeSearchTags, searchTags }) => (
    <div className='selectedTag' data-val={tagName}>
      <span>{tagName}</span>
      <a className='removeTag' onClick={e => removeTag(e, changeSearchTags, searchTags)}>X</a>
    </div>
);

const removeTag = (e, changeSearchTags, searchTags) => {
  e.preventDefault();
  changeSearchTags(searchTags.filter(el => el !== e.target.parentNode.dataset.val));
};

export  default SelectedTag;