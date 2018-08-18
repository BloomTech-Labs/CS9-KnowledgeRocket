import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './index.css';
import Styled from 'styled-components';

const HomeCTA = Styled.div`
    font-family: 'Roboto';
    background: url('/img/HomePage_CTA_07.svg') no-repeat center center;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 1150px;
    background-color: black;
    @media(min-width: 2000px) {
        &{
            background-size: contain;
        }
    }
`;

export const HomeContainer = Styled.div`
    font-family: 'Roboto', sans-serif;
`;

const MidContainer = Styled.div`
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const HomeHeader = Styled.h2`
    font-size: 4rem;
    font-weight: 900;
    color: #232323;
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
    border: 1px solid #232323;;
    margin: 1rem;
    box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.5)
`;

const MidImg = Styled.img`
    background: url( ${(props) => { return props.src }} );
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
        return <HomeContainer>
                <HomeCTA>
                    <div className="Home_ButtonDiv">
                        <Button className="Home_Button" color="primary" onClick={this.handleAuthRedirect}>
                            Sign Up
                        </Button>
                        <Button className="Home_Button" color="primary" onClick={this.handleAuthRedirect}>
                            Sign In
                        </Button>
                    </div>
                </HomeCTA>
                <MidContainer>
                    <HomeHeader>What is a Knowledge Rocket?</HomeHeader>
                    <MidSectionWrapper>
                        <MidSection>
                            <MidImg src="/img/amanda-sandlin-10508-unsplash.jpg" />
                            <MidSectionText>
                                Text for mid section here should not be very length but
                                should contain enough information about this section.Text
                                for mid section here should not be very length but should
                                contain enough information about this section.
                            </MidSectionText>
                        </MidSection>
                        <MidSection>
                            <MidImg src="/img/erik-nielsen-783260-unsplash.jpg" />
                            <MidSectionText>
                                Text for mid section here should not be very length but
                                should contain enough information about this section.Text
                                for mid section here should not be very length but should
                                contain enough information about this section.Text for mid
                                section here should not be very length but should contain
                                enough information about this section.
                            </MidSectionText>
                        </MidSection>
                        <MidSection>
                        <MidImg src="/img/nasa-63029-unsplash.jpg" />
                            <MidSectionText>
                                Text for mid section here should not be very length but
                                should contain enough information about this section.Text
                                for mid section here should not be very length but should
                                contain enough information about this section.
                            </MidSectionText>
                        </MidSection>
                    </MidSectionWrapper>
                </MidContainer>
            </HomeContainer>;
    }
}
