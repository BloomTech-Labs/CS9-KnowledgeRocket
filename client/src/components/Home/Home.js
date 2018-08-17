import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './index.css';
import Styled from 'styled-components';

const HomeCTA = Styled.div`
    background: url('/img/HomePage_CTA_04.svg') no-repeat center center;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 880px;
    &:hover {
        cursor: pointer;
    }
    @media(max-width: 800px) {
        width: 100vw;
        min-height: 100vh;
    }
`;

const HomeContainer = Styled.div`
    font-family: 'Roboto', sans-serif;
`;

const HomeCtaHeaderLeft = Styled.h1`
    font-size: 4rem;
    font-weight: 900;
    color: #005B97;
    min-width: 300px;
    width: 35vw;
    text-align: center;
    padding-top: 60vh;
    @media(max-width: 1400px){
        font-size: 2.8rem;
    }
    @media(max-width: 1200px){
        font-size: 2.3rem;
    }
`;
const HomeCtaHeaderRight = Styled.h1`
    font-size: 4rem;
    font-weight: 900;
    color: #005B97;
    min-width: 300px;
    width: 35vw;
    text-align: center;
    padding-top: 60vh;
    @media(max-width: 1400px){
        font-size: 2.8rem;
    }
    @media(max-width: 1200px){
        font-size: 2.3rem;
    }
`;

const HomeCtaHeaderRight2 = Styled(HomeCtaHeaderRight)`
    padding-top: 0;
`;

const MidContainer = Styled.div`
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const HomeCtaHeaderWrapper = Styled.div`
    width: 100%;
    display:none;
    @media(min-width: 700px) {
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-end;
        justify-content: space-between;
        width: 100%;
        max-width: 1920px;
    }
`;

const HomeHeader = Styled.h2`
    font-size: 4rem;
    font-weight: 900;
    color: #005B97;
    min-width: 300px;
    max-width: 800px;
    text-align: center;
    margin: 3rem 0;
`;

const MidSectionWrapper = Styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    width: 100%;
`;

const MidSection = Styled.div`
    display: flex;
    flex-direction: column;
    min-width: 300px;
    max-width: 30%;
    background-color: #DFDFDF;
    border-radius: .5rem;
    border: 1px solid #005B97;
    margin: 1rem;
    box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.5)
`;

const MidImg = Styled.img`
    margin: 1rem;
    height: 200px;
    background-color: #FEFEFE;
    border-radius: .3rem;
`;

const MidSectionText = Styled.p`
    margin: 1rem;
    font-size: 1.5rem;
    text-align: justify;
`;

export default class Home extends Component {
    handleAuthRedirect = e => {
        this.props.history.push('/rocket/auth');
    };
    render() {
        return (
            <HomeContainer>
                <HomeCTA onClick={this.handleAuthRedirect}>
                    <div className="Home_ButtonDiv">
                        <Button
                            className="Home_Button"
                            color="primary"
                            onClick={this.handleAuthRedirect}
                        >
                            Sign Up
                        </Button>
                        <Button
                            className="Home_Button"
                            color="primary"
                            onClick={this.handleAuthRedirect}
                        >
                            Sign In
                        </Button>
                    </div>
                    <HomeCtaHeaderWrapper>
                        <div>
                            <HomeCtaHeaderLeft>KNOWLEDGE</HomeCtaHeaderLeft>
                            <HomeCtaHeaderRight2>ROCKET</HomeCtaHeaderRight2>
                        </div>
                        <div>
                            <HomeCtaHeaderRight>LAUNCH YOUR</HomeCtaHeaderRight>
                            <HomeCtaHeaderRight2>LEARNING</HomeCtaHeaderRight2>
                        </div>
                    </HomeCtaHeaderWrapper>
                </HomeCTA>
                <MidContainer>
                    <HomeHeader>What is a Knowledge Rocket?</HomeHeader>
                    <MidSectionWrapper>
                        <MidSection>
                            <MidImg />
                            <MidSectionText>
                                Text for mid section here should not be very length but should
                                contain enough information about this section.Text for mid section
                                here should not be very length but should contain enough information
                                about this section.
                            </MidSectionText>
                        </MidSection>
                        <MidSection>
                            <MidImg />
                            <MidSectionText>
                                Text for mid section here should not be very length but should
                                contain enough information about this section.Text for mid section
                                here should not be very length but should contain enough information
                                about this section.Text for mid section here should not be very
                                length but should contain enough information about this section.
                            </MidSectionText>
                        </MidSection>
                        <MidSection>
                            <MidImg />
                            <MidSectionText>
                                Text for mid section here should not be very length but should
                                contain enough information about this section.Text for mid section
                                here should not be very length but should contain enough information
                                about this section.
                            </MidSectionText>
                        </MidSection>
                    </MidSectionWrapper>
                </MidContainer>
            </HomeContainer>
        );
    }
}
