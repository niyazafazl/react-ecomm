import React from 'react';
// import styled from 'styled-components';
import './homepage.styles.scss';
import {HomePageContainer} from './homepage.stylesComp';

import Directory from '../../components/directory/directory.components';

// const TextStyles = styled.div`
//   color: red;
//   font-size: 28px;
//   border: ${({ isActive}) => isActive ? '1px solid black' : '3px dotted green'} 
// `;
// render the styling based on the boolean value we pass in the JSX
const HomePage = (props) => { //the history props is only accessible to the base component which is the homepage component. This menu-items and directory components are ectended from the homepage component
    console.log(props);
    return(
        // <div className="homepage">
        //     <TextStyles isActive={false}> This text using the Styled component</TextStyles>
        // <Directory/>
        // </div>
    //rendering the HTML using the styled-components insted of css 
        <HomePageContainer>
        <Directory/>
        </HomePageContainer>
    )
   
}
export default HomePage;