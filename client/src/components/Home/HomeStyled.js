import Button from '@material-ui/core/Button';
import styled from 'styled-components';

export const HomeCTA = styled.div`
    font-family: 'Roboto';
    width: 100%;
    background: url('/img/SpaceBG.jpg') no-repeat center center;
    background-size: cover;
    height: 400px;
    background-repeat: no-repeat;
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
        width: 15%;
        min-width: 100px;
    }
    @media (max-width: 500px) {
        height: 300px;
    }
    @media (min-width: 1024px) {
        height: 600px;
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
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
`;

export const CtaContainer = styled.div`
    width: 100%;
    padding: 3rem 0 0 0;
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
    width: 100%;
    text-align: center;
    margin: 3rem 0;
    @media (max-width: 500px) {
        font-size: 3rem;
    }
`;

export const HomeCtaHeader = styled(HomeHeader)`
    font-weight: 460;
    color: white;
    text-shadow: -2px 0px 3px black, 2px 0px 3px black, 0px -2px 3px black, 0px 2px 3px black;
    @media (max-width: 500px) {
        font-size: 2rem;
    }
`;

export const MidHeader = styled.h3`
    font-size: 2rem;
    font-weight: 900;
    color: #232323;
    max-width: 100%;
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
    padding: 1rem;
`;

export const MidColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 410px;
`;

export const MidSection = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #dfdfdf;
    border-radius: 0.5rem;
    border: 1px solid #232323;
    height: 100%;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.5);
`;

export const MidImg = styled.img`
    padding: 1rem;
    height: 200px;
    width: 100%;
    border-radius: 0.3rem;
`;

export const MidSectionText = styled.p`
    padding: 1rem;
    font-size: 1.5rem;
    text-align: justify;
`;

export const FooterSection = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: black;
`;

export const FollowSection = styled.div`
    color: white;
    flex-grow: 1;
    flex-wrap: wrap;
    display: flex;
    padding: 0.5rem 0.5rem;
    align-items: center;
    width: 100%;
    justify-content: center;
    a {
        text-decoration: none;
    }
`;

export const FollowButton = styled.div`
    font-size: 0.875rem;
    min-width: 64px;
    transition: background-color 250ms darkgray 0ms;
    min-height: 36px;
    box-sizing: border-box;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 500;
    border-radius: 4px;
    color: white;
    border: 1px solid white;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 0.25rem;
    margin: 0.25rem;
`;
