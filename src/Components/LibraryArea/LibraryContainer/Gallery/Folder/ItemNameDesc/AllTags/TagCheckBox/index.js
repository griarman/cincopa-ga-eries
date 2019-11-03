import React, { useState } from 'react'

const TagCheckBox = ({ searchTag, checked }) => {
  const [propChecked, setPropChecked] = useState(checked);
  return (
    <li onClick={() => {}}>
      <div className="selected">
        <label className="checkBox">
          <input type="checkbox" value={searchTag} checked={propChecked} />
          <i/><b/>
        </label>
      </div>
      <div className="descr"><a>{searchTag}</a></div>
    </li>
  )
};

export default TagCheckBox;
