import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';

import MenuItem from '../menu-items/menu-items.components';

import './directory.styles.scss';

// this compoenent will be the class component bcoz we have to store the state value of the menu item

const Directory = ({ sections }) => (
  <div className="directory-menu">
      {
        // this.state.sections.map(({title, imageUrl, id, size, linkUrl}) => (
        //     <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} linkUrl={linkUrl}/>
        // ))
        //another simplest way of passing the props, if u see in the above the props name and attributes name we used are same, only for the id its different(key).
        //So we can use the rest parameter using ... (3 dots), it means we say takes all other parameters except id from the sections array and we sending this to menuItem
        sections.map(({id, ...otherSectionProps}) => (
          <MenuItem key={id} {...otherSectionProps} />
        ))
      }
  </div>
)
const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);