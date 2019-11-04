import React, { useState, useRef } from 'react'

const Name = ({ name, changeGalleryName, fid }) => {
  const [nameChanger, setName] = useState(['none', 'block']);
  const nameRef = useRef(null);
  const newName = useRef(null);

  return (
    <>
      <span
        className='name filename'
        title={name}
        style={{display: nameChanger[1]}}
      >
          <span
            ref={newName}
            onClick={() => setName([...nameChanger].reverse())}
          >{name}</span>
          <a
            className='changeLink btn trans'
            title='Edit Title'
            onClick={() => setName([...nameChanger].reverse())}
          >
            <i className='icon-edit' />
          </a>
          <span className="galState status synced ready" data-status="synced">
            <i />
            <b>Ready</b>
            <b className="hint">Gallery is ready</b>
          </span>
        </span>
      <div className='changeName' style={{display: nameChanger[0]}}>
        <form id="changeName" onSubmit={e => {e.preventDefault()}}>
          <input name="changeName" type="text" defaultValue={name} ref={nameRef}/>
          <div>
            <a href="javascript:void(0)" onClick={async () => {
              let newNameText = nameRef.current.value.trim();
              if (!newNameText) {
                setName([...nameChanger].reverse());
                return;
              }
              const data = await changeGalleryName(fid, newNameText);
              newName.current.innerText = data.name;
              setName([...nameChanger].reverse());
            }}
            >Save</a>
            <a
              href="javascript:void(0)"
              onClick={() => setName([...nameChanger].reverse())}
              className='cancelName'
            >Cancel</a>
          </div>
        </form>
      </div>
    </>
  )
};



export default Name;
