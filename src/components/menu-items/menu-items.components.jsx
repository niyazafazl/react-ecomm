import React from 'react';
import {withRouter} from 'react-router-dom';

import './menu-items.styles.scss';

//withRouter is a higher-order component, its a function it takes the component as an argument and returns u a new modified component
const MenuItem = ({title, imageUrl, size, linkUrl, history, match}) => (
    <div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}> 
        <div className="background-image" style={{
            backgroundImage: `url(${imageUrl})`
        }}></div>
        <div className="content">
            <h1 className='title'>{title.toUpperCase()}</h1>
            <span className='sub-tile'>SHOP NOW</span>
        </div>
        
    </div>
)
export default withRouter(MenuItem); 
//we powering up the menuItem component with the 'withRouter' func. now this menuItem component had the access to the homepage's component attributes like history, location, match.
// Bcoz the history props is only accessible to the base component which is the homepage component. This menu-items and directory components are ectended from the homepage component