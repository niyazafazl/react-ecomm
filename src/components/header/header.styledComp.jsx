import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom';

// this css module from styled-components allow us to write block of css and pass and render into the other styled component block
const OptionContainerStlyles = css` 
    padding: 10px 15px;
    cursor: pointer;
`;
export const HeaderContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;
`;

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;
// this is for className option in the Link tag
export const OptionLink = styled(Link)`
    ${OptionContainerStlyles}
`
// this is for className option in the div tag
export const OptionDiv = styled.div`
    ${OptionContainerStlyles}
`