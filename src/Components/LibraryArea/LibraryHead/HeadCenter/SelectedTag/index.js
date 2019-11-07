import React from 'react';

const SelectedTag = ({ el: tagName, changeSearchTags, searchTags, changeHashByTags }) => (
  <div className="selectedTag" data-val={tagName}>
    <span>{tagName}</span>
    <a className="removeTag" onClick={e => removeTag(e, changeSearchTags, searchTags, changeHashByTags)}>X</a>
  </div>
);

const removeTag = (e, changeSearchTags, searchTags, changeHashByTags) => {
  e.preventDefault();
  let newSearchTags = searchTags.filter(el => el !== e.target.parentNode.dataset.val);
  changeSearchTags(newSearchTags);
  changeHashByTags(newSearchTags);
};

export default SelectedTag;
