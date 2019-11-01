import React, { useState, useRef } from 'react'

const Description = ({ fid, saveNewDesc, description }) => {
  const [descChanger, setDescription] = useState(['none', 'block']);
  const newDesc = useRef(null);
  const descRef = useRef(null);
  return (
    <>
      <div
        className='description edit_desc'
        title={description || 'no-description'}
        data-desc={description || 'no-description'}
        onClick={() => setDescription([...descChanger].reverse())}
        style={{display: descChanger[1]}}
      >
        <i style={{paddingRight: 36 + 'px'}} ref={newDesc}>{description || 'no-description'}</i>
        <a className='changeLink btn trans' title='Edit Description'><i className='icon-edit'/></a>
      </div>
      <div className="changeDescription fieldItem" style={{display: descChanger[0]}}>
          <textarea
            ref={descRef}
            className="field"
            name="change_desc"
            placeholder="Gallery Description">{description || 'no-description'}
          </textarea>
        <div className="save_cancel_box" style={{display: descChanger[0]}}>
          <a href="javascript:void(0)" onClick={async () => {
            let newDescTag = descRef.current.value.trim();
            if (!newDescTag) {
              setDescription([...descChanger].reverse());
              return;
            }
            const newDescData = await saveNewDesc(fid, newDescTag);
            newDesc.current.innerText = newDescData.description;
            setDescription([...descChanger].reverse())

          }}>Save</a>
          <a
            href="javascript:void(0)"
            onClick={() => setDescription([...descChanger].reverse())}
            className='cancelDesc'
          >Cancel</a>
        </div>
      </div>
    </>
  );
};

export default Description;
