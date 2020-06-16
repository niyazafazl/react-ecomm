import React from 'react';
import './homepage.styles.scss';
import Directory from '../../components/directory/directory.components';

const HomePage = (props) => { //the history props is only accessible to the base component which is the homepage component. This menu-items and directory components are ectended from the homepage component
    console.log(props);
    return(
        <div className="homepage">
        <Directory/>
        </div>
    )
   
}
export default HomePage;