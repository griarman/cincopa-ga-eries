import React, { Component } from 'react'

import MyContext from '../../../../../../Context/MyContext'
import './style.scss'

class ItemNameDesc extends Component {
  constructor(props) {
    super(props);

    this.nameRef = React.createRef(null);
    this.newName = React.createRef(null);
    this.newDesc = React.createRef(null);
    this.descRef = React.createRef(null);

    this.state = {
      nameChanger: ['none', 'block'],
      descChanger: ['none', 'block'],
    }
  }

  render() {
    const { name, description, modified, fid, did, tags} = this.props;
    const { ManageGalleriesSettings } = this.context;

    return (
      <td className='item_name_desc'>
        <span
          className='name filename'
          title={name}
          style={{display: this.state.nameChanger[1]}}
          onClick={() => {
            this.setState({ nameChanger: this.state.nameChanger.reverse() })
          }}
        >
          <span ref={this.newName}>{name}</span>
          <a className='changeLink btn trans' title='Edit Title'>
            <i className='icon-edit'/>
          </a>
        </span>
        <div className='changeName' style={{display: this.state.nameChanger[0]}}>
          <form id="changeName" onSubmit={e => this.changeName(e, fid)}>
            <input name="changeName" type="text" defaultValue={name} ref={this.nameRef}/>
            <div>
              <a href="javascript:void(0)" onClick={async () => {
                let newName = this.nameRef.current.value.trim();
                if (!newName) {
                  this.cancelNameChange();
                  return;
                }
                const data = await ManageGalleriesSettings.changeGalleryName(fid, newName);
                this.newName.current.innerText = data.name;
                this.cancelNameChange();
              }}>Save</a>
              <a href="javascript:void(0)" onClick={this.cancelNameChange}>Cancel</a>
            </div>
          </form>
        </div>
        <div className='caption' title='no-caption'><i/></div>
        <div
          className='description edit_desc'
          title={description || 'no-description'}
          data-desc={description || 'no-description'}
          onClick={() => {
            this.setState({ descChanger: this.state.descChanger.reverse() })
          }}
        >
          <i style={{paddingRight: 36 + 'px'}}>{description || 'no-description'}</i>
          <a className='changeLink btn trans' title='Edit Description'><i className='icon-edit'/></a>
        </div>
        <div className="changeDescription fieldItem">
          <textarea
            ref={this.descRef}
            className="field"
            name="change_desc"
            placeholder="Gallery Description">{description || 'no-description'}
          </textarea>
          <div className="save_cancel_box" style={{display: this.state.descChanger[0]}}>
            <a href="javascript:void(0)" onClick={async () => {
              let newDesc = this.descRef.current.value.trim();
              if (!newDesc) {
                this.cancelNameChange();
                return;
              }
              const newDescData = await ManageGalleriesSettings.saveNewDesc(fid, newDesc);
              this.newDesc.current.innerText = newDescData.description;
              this.cancelDescChange();

            }}>Save</a>
            <a href="javascript:void(0)" onClick={this.cancelDescChange}>Cancel</a>
          </div>
        </div>
        <div className='lastUpdated'>
          <i className='icon-clock'/>
          <div className='date_div'> Last Updated: {modified.split(' ')[0]}</div>
        </div>
        <div className='galleryId'>
          <i className='icon-gall_id'/>
          <div className='galid_div'> Gallery ID: {did}</div>
        </div>
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
        <div className='moreInfo'/>
      </td>
    )
  };

  changeName = (e, fid) => {
    e.preventDefault();
    console.log(fid);
  };

  cancelNameChange = () => {
    this.setState({
      nameChanger: this.state.nameChanger.reverse()
    })
  };

  cancelDescChange = () => {
    this.setState({
      nameChanger: this.state.nameChanger.reverse()
    })
  }
}

ItemNameDesc.contextType = MyContext.Consumer;
export default ItemNameDesc;
