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
      propTags: props.tags,
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
                <a
                  title="Removing tag"
                  className="removeTag"
                  href="javascript:void(0)"
                  onClick={() => this.changeTagsStatistic(tag, 'remove')}
                >x</a>
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
            onClick={this.closeDropDown}
            onScroll={this.closeDropDown}
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
                      let newTags = this.state.propTags.split(',').filter(Boolean);
                      newTags.push(value);
                      this.tagRef.current.value = '';
                      this.setState(prevState => ({
                        ...prevState,
                        tagText: 'none',
                        ownTags: Object.keys(this.state.tagCloud),
                        propTags: newTags.join(',')
                      }), () => {this.props.setTags(this.props.fid, this.state.propTags);});
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
                    key={Helpers.generateRandomNumber()}
                    checked={checked}
                    searchTag={searchTag}
                    changeTagsStatistic={this.changeTagsStatistic}
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

  closeDropDown = () => {
    this.tagRef.current.value = '';
    this.setState(prevState => ({
      ...prevState,
      tagsContainer: [...this.state.tagsContainer].reverse(),
      newSearchTag: '',
    }))
  };

  changeTagsStatistic = (tag, action) => {
    let { tagCloud, propTags }= this.state;
    switch (action) {
      case 'add':
        if (!propTags) {
          if (tagCloud.notags - 1 === 0) delete tagCloud.notags;
          else tagCloud.notags--;
        }
        propTags = !propTags.length ? tag : (propTags + ',' + tag);
        tagCloud[tag]++;
        break;
      case 'remove':
        propTags = propTags.split(',').filter(propTag => propTag !== tag).join(',');
        if (!propTags) {
          if (!tagCloud.notags) tagCloud.notags = 1;
          else tagCloud.notags++;
        }
        if (tagCloud[tag] - 1 === 0) delete tagCloud[tag];
        else tagCloud[tag]--;
        break;
    }
    console.log(propTags, tagCloud);
    this.setState(prevState => ({
      ...prevState,
      tagCloud,
      propTags,
      ownTags: Object.keys(tagCloud),
    }));
    this.props.changeAllTags(tagCloud);
    let sendTag = !propTags ? ',' : propTags;
    this.props.setTags(this.props.fid, sendTag);
    window['sendEventToGTM']("Gallery Meta", "Tag Change", "", true);
  }
}

export default AllTags;
