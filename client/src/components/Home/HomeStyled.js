import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const HomeCTA = styled.div`
    max-width: 900px;
    margin: 0 auto;
    font-family: 'Roboto';
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 400px;
    img {
        height: 200px
        width: 200px;
        justify-content: center;
        align-items: center;
        @media (max-width: 740px) {
            display: none;
        }
    }
    @media (max-width: 500px) {
        height: 300px;
    }
    @media (min-width: 1024px) {
        height: 500px;
    }
`;

export const StyledAssignmentIcon = styled(AssignmentIcon)`
    color: #3f51b5;
    margin-right: 1rem;
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
    background: url('/img/SpaceBG_Darker.jpg') no-repeat bottom center;
    background-color: black;
`;

export const MidContainer = styled.div`
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const HomeHeader = styled.h2`
    font-size: 3rem;
    font-weight: 900;
    color: #232323;
    width: 100%;
    text-align: center;
    margin: 3rem 0 3rem 0;
    @media (max-width: 500px) {
        font-size: 3rem;
        padding: 0 1rem;
    }
`;

export const HomeCtaHeader = styled(HomeHeader)`
    text-align: left;
    font-weight: 460;
    color: white;
    text-shadow: -2px 0px 3px black, 2px 0px 3px black, 0px -2px 3px black, 0px 2px 3px black;
    @media (max-width: 500px) {
        font-size: 2rem;
    }
    width: 100%;
    padding: 0 2rem;
`;

export const MidHeader = styled.h3`
    font-size: 1.8rem;
    font-weight: 900;
    color: #232323;
    width: 100%;
`;

export const MidSectionWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-around;
    max-width: 900px;
    margin: 0 auto;
    padding: 1rem;
    @media (max-width: 900px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const CtaSmallHeader = styled(MidHeader)`
    font-size: 1.8rem;
    color: white;
    font-weight: 460;
    text-align: left;
    width: 100%;
`;
export const CtaText = styled.h3`
    width: 70%;
    font-size: 1rem;
    color: white;
    @media (max-width: 500px) {
        width: 100%;
    }
`;

export const CtaSection = styled.div`
    margin: 1rem 0;
    width: 100%;
    color: #898e96;
`;

export const CtaColumn = styled.div`
    margin: 0.5rem 0 0 1.5rem;
    padding: 0.5rem 0 0 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 80%;
    min-width: 200px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    border-radius: 0.5rem;
    border: 0;
    @media (max-width: 500px) {
        width: 100%;
        margin: 0.5rem 1.5rem 0 1.5rem;
    }
`;

export const CtaSectionWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: flex-start;
    margin: 0 0 2rem 0;
`;

export const MidColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    @media (max-width: 900px) {
        width: 80%;
    }
    @media (max-width: 400px) {
        width: 100%;
    }
`;

export const MidSection = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
`;

export const MidSectionText = styled.p`
    padding: 1rem 0 1rem 0;
    font-size: 1rem;
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

export const BottomHeader = styled.h2`
    font-size: 2rem;
    font-weight: 900;
    color: #232323;
    width: 100%;
    text-align: center;
    margin: 3rem 0 3rem 0;
    @media (max-width: 500px) {
        width: 100%;
        margin: 0;
        padding: 3rem 0 3rem 0;
    }
`;

export const PreviewSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #c4e4fd;
    padding: 1rem;
    img {
        margin: 0 0 2rem 0;
        width: 600px;
        border-radius: 0.25rem;
        border: 0;
        box-shadow: 0px 1px 3px 0px rgba(15, 12, 12, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
            0px 2px 1px -1px rgba(0, 0, 0, 0.12);
        @media (max-width: 700px) {
            width: 100%;
            margin: 0 1rem 2rem 1rem;
        }
    }
`;
