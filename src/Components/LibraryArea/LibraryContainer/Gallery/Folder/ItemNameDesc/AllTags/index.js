import React, { Component } from 'react'

import Helpers from '../../../../../../../libs/helpers'
import TagCheckBox from './TagCheckBox'
import './style.scss'

class AllTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: `tags${Helpers.generateRandomNumber()}`,
      initialTags: Object.keys(props.tagCloud),
      tagCloud: props.tagCloud,
      tagsContainer: ['none', 'block'],
      tagText: 'none',
      ownTags: Object.keys(props.tagCloud),
      newSearchTag: '',
      propTags: props.tags
    };

    this.tagRef = React.createRef(null);
    this.keyUpTimer = null;
    this.timer = 400;
  }
  render() {
    return(
      <>
        <div className='all_tags'>
          <div className='tags'>
            <input name='tags_main'
                   value={this.state.propTags}
                   id='id'
                   style={{display: 'none'}}
            />
            <div id={this.state.id + '_tagsinput'}
                 className='tagsinput'
                 style={{
                   width: 300 + 'px',
                   minHeight: 40 + 'px',
                   height: 100 + '%'
                 }}
            >
              {this.state.propTags && this.state.propTags.split(',').map(tag =>
                  <span className='tag'>
                <span>{tag}</span>
                <a title="Removing tag" className="removeTag" href="javascript:void(0)">x</a>
              </span>
              )}
              <div id={this.state.id + '_addTag'} style={{display: 'none'}}>
                <input
                  id={this.state.id + '_tag'}
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
          <a
            href='javascript:void(0)'
            className='selectTags'
            onClick={() => this.setState(prevState => ({
              ...prevState,
              tagsContainer: [...this.state.tagsContainer].reverse(),
            }))}
          >Add new tag</a>
          <div
            style={{display: this.state.tagsContainer[0]}}
            className='overLine'
            onClick={() => {
              this.tagRef.current.value = '';
              this.setState(prevState => ({
                ...prevState,
                tagsContainer: [...this.state.tagsContainer].reverse(),
                newSearchTag: ''
              }))
            }}
          />
          <div className="itemsDropdown tagsList" style={{display: this.state.tagsContainer[0]}}>
            <div className="itemsDropdown_items" style={{display: this.state.tagsContainer[0]}}>
              <div className="searchInput">
                <input
                  type="text"
                  ref={this.tagRef}
                  onKeyUp={e => {
                    this.keyUpTimer = setTimeout(() => {
                      clearTimeout(this.keyUpTimer);
                      let value = this.tagRef.current.value.trim();
                      if (value) {
                        let newOwnTags = this.state.ownTags.filter(ownTag => ownTag.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                        this.setState(prevState => ({
                          ...prevState,
                          tagText: 'block',
                          newSearchTag: value,
                          ownTags: newOwnTags
                        }))
                      }
                      else {
                        this.setState(prevState => ({
                          ...prevState,
                          tagText: 'none',
                          ownTags: this.state.initialTags
                        }));
                      }
                    }, this.timer);
                  }}
                />
                <p style={{display: this.state.tagText}}>
                  <span className="searchInputNew">{this.state.newSearchTag}</span>
                  <span className="searchInputCreate" onClick={() => {
                    let value = this.tagRef.current.value.trim();
                    if (!this.state.initialTags.find(tag => value.toLowerCase() === tag.toLowerCase())) {
                      this.state.tagCloud[value] = 1;
                      this.props.changeAllTags(this.state.tagCloud);
                      let newTags = this.state.propTags.split(',');
                      newTags.push(value);
                      console.log(newTags.join(','), 2);
                      this.tagRef.current.value = '';
                      this.setState(prevState => ({
                        ...prevState,
                        tagText: 'none',
                        ownTags: Object.keys(this.state.tagCloud),
                        propTags: newTags.join(',')
                      }));
                    }
                  }}>&nbsp;&nbsp;&nbsp;&nbsp;(Create tag)</span>
                </p>
              </div>
              <ul>
                {this.state.ownTags.map(searchTag => {
                  if (searchTag === 'notags') return null;
                  let tagsArray = this.state.propTags.split(',');
                  let checked = tagsArray.indexOf(searchTag) !== -1 ? 'checked' : '';
                  return <TagCheckBox
                    checked={checked}
                    searchTag={searchTag}
                  />
                })}
              </ul>
            </div>
            <div className="itemsDropdown_head" style={{display: this.state.tagsContainer[0]}}>
              <a className="btn primary smallest tagsListBtn" href="#" style={{display: 'inline-block'}}>Apply</a>
            </div>
          </div>
        </div>
      </>
    )
  }
}
/*
const AllTags = ({ tags, tagCloud, changeAllTags,  setTags }) => {
  const initialTags = Object.keys(tagCloud);
  const id = `tags${Helpers.generateRandomNumber()}`;
  const [tagsContainer, setContainerState] = useState(['none', 'block']);
  const [tagText, setTextState] = useState('none');
  const [ownTags, setOwnTags] = useState(initialTags);
  const [newSearchTag, setSearchTagState] = useState('');
  const [propTags, setPropTags] = useState(tags);
  const tagRef = useRef(null);
  let keyUpTimer = null, timer = 400;

  return (
    <>
      <div className='all_tags'>
        <div className='tags'>
          <input name='tags_main'
                 value={propTags}
                 id='id'
                 style={{display: 'none'}}
          />
          <div id={id + '_tagsinput'}
               className='tagsinput'
               style={{
                 width: 300 + 'px',
                 minHeight: 40 + 'px',
                 height: 100 + '%'
               }}
          >
            {console.log(propTags, 1)}
            {propTags && propTags.split(',').map(tag =>
              <span className='tag'>
                <span>{tag}</span>
                <a title="Removing tag" className="removeTag" href="javascript:void(0)">x</a>
              </span>
            )}
            <div id={id + '_addTag'} style={{display: 'none'}}>
              <input
                id={id + '_tag'}
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
        <a
          href='javascript:void(0)'
          className='selectTags'
          onClick={() => setContainerState([...tagsContainer].reverse())}
        >Add new tag</a>
        <div
          style={{display: tagsContainer[0]}}
          className='overLine'
          onClick={() => {
            setContainerState([...tagsContainer].reverse());
            tagRef.current.value = '';
            setSearchTagState('');

          }}
        />
        <div className="itemsDropdown tagsList" style={{display: tagsContainer[0]}}>
          <div className="itemsDropdown_items" style={{display: tagsContainer[0]}}>
            <div className="searchInput">
              <input
                type="text"
                ref={tagRef}
                onKeyUp={e => {
                  keyUpTimer = setTimeout(() => {
                    clearTimeout(keyUpTimer);
                    let value = tagRef.current.value.trim();
                    if (value) {
                      setSearchTagState(value);
                      setTextState('block');
                      let newOwnTags = ownTags.filter(ownTag => ownTag.toLowerCase().indexOf(value.toLowerCase()) !== -1);
                      setOwnTags(newOwnTags);
                    }
                    else {
                      setOwnTags(initialTags);
                      setTextState('none');
                    }
                  }, timer);
                }}
              />
              <p style={{display: tagText}}>
                <span className="searchInputNew">{newSearchTag}</span>
                <span className="searchInputCreate" onClick={() => {
                  let value = tagRef.current.value.trim();
                  if (!initialTags.find(tag => value.toLowerCase() === tag.toLowerCase())) {
                    tagCloud[value] = 1;
                    changeAllTags(tagCloud);
                    let newTags = propTags.split(',');
                    newTags.push(value);
                    console.log(newTags.join(','), 2);
                    setPropTags(newTags.join(','));
                    tagRef.current.value = '';
                    setOwnTags(Object.keys(tagCloud));
                    setTextState('none');
                  }
                }}>&nbsp;&nbsp;&nbsp;&nbsp;(Create tag)</span>
              </p>
            </div>
            <ul>
              {ownTags.map(searchTag => {
                if (searchTag === 'notags') return null;
                let tagsArray = propTags.split(',');
                let checked = tagsArray.indexOf(searchTag) !== -1 ? 'checked' : '';
                return <TagCheckBox
                  checked={checked}
                  searchTag={searchTag}
                />
              })}
            </ul>
          </div>
          <div className="itemsDropdown_head" style={{display: tagsContainer[0]}}>
            <a className="btn primary smallest tagsListBtn" href="#" style={{display: 'inline-block'}}>Apply</a>
          </div>
        </div>
      </div>
    </>
  )
};*/

export default AllTags;
