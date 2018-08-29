import Button from '@material-ui/core/Button';
import styled from 'styled-components';

export const HomeCTA = styled.div`
    font-family: 'Roboto';
    background: url('/img/HomePage_CTA_11.svg') no-repeat center center;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 600px;
    background-color: black;
    @media (min-width: 2000px) {
        & {
            background-size: contain;
        }
    }
`;

export const HomeNav = styled.div`
    display: flex;
    justify-content: space-between;
    position: fixed;
    width: 100%;
    background-color: black;
`;

export const NavButton = styled(Button)`
    background-color: white !important;
    color: black !important;
    font-weight: 900 !important;
    margin: 0.4rem !important;
`;

export const NavLogo = styled.img`
    height: 3rem;
    width: 3rem;
    margin: 0 1rem;
    &:hover {
        cursor: pointer;
    }
`;

export const HomeContainer = styled.div`
    font-family: 'Roboto', sans-serif;
`;

export const MidContainer = styled.div`
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const HomeHeader = styled.h2`
    font-size: 4rem;
    font-weight: 900;
    color: #232323;
    min-width: 300px;
    max-width: 800px;
    text-align: center;
    margin: 3rem 0;
`;

export const MidHeader = styled.h3`
    font-size: 2rem;
    font-weight: 900;
    color: #232323;
    min-width: 300px;
    max-width: 800px;
    text-align: center;
    margin: 3rem 0;
`;

export const MidSectionWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-evenly;
    margin: 0 0 2rem 0;
`;

export const MidColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 410px;
    min-width: 300px;
`;

export const MidSection = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 300px;
    max-width: 100%;
    background-color: #dfdfdf;
    border-radius: 0.5rem;
    border: 1px solid #232323;
    margin: 1rem;
    height: 100%;
    box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.5);
`;

export const MidImg = styled.img`
    background: url(${props => {
        return props.src;
    }});
    margin: 1rem;
    height: 200px;
    background-color: #fefefe;
    border-radius: 0.3rem;
`;

export const MidSectionText = styled.p`
    margin: 1rem;
    font-size: 1.5rem;
    text-align: justify;
`;

export const FooterSection = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: black;
`;
