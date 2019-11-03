import React, { useRef } from 'react'

const TagCheckBox = ({ searchTag, checked, changeTagsStatistic }) => {
  const checkbox = useRef(null);

  return (
    <li onClick={() => {
      let selected = checkbox.current.checked;
      if (selected) {
        checkbox.current.checked = false;
        changeTagsStatistic(searchTag, 'remove');
      }
      else {
        checkbox.current.checked = false;
        changeTagsStatistic(searchTag, 'add');
      }
    }}>
      <div className="selected">
        <label className="checkBox">
          <input type="checkbox" value={searchTag} checked={checked} ref={checkbox} />
          <i/><b/>
        </label>
      </div>
      <div className="descr"><a>{searchTag}</a></div>
    </li>
  )
};

export default TagCheckBox;
