import React, { Component } from 'react';
import {
    HomeContainer,
    HomeCTA,
    HomeNav,
    NavLogo,
    NavButton,
    HomeHeader,
    MidSection,
    MidSectionWrapper,
    MidColumn,
    MidContainer,
    MidHeader,
    MidSectionText,
    FooterSection,
    FollowSection,
    FollowButton,
    CtaContainer,
    HomeCtaHeader,
    StyledAssignmentIcon,
    CtaSectionWrapper,
    CtaSmallHeader,
    CtaSection,
    CtaColumn,
    CtaText,
    PreviewSection,
    BottomHeader,
} from './HomeStyled';
import Button from '@material-ui/core/Button';

export default class Home extends Component {
    handleAuthRedirect = e => {
        this.props.history.push('/rocket/auth');
    };

    handleHome = e => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    handleContact = e => {
        window.location.href = 'mailto:lambdaknowledgerocket@gmail.com';
    };

    render() {
        return (
            <HomeContainer>
                <HomeNav>
                    <div>
                        <NavLogo src="/img/Logo_BW_SML.svg" onClick={this.handleHome} />
                    </div>
                    <div>
                        {!this.props.authenticated ? (
                            <NavButton onClick={this.handleAuthRedirect}>Get Started</NavButton>
                        ) : (
                            <NavButton onClick={this.handleAuthRedirect}>To Dashboard</NavButton>
                        )}
                    </div>
                </HomeNav>
                <CtaContainer>
                    <HomeCTA>
                        <div>
                            <HomeCtaHeader>Launch Your Learning</HomeCtaHeader>
                            <CtaSectionWrapper>
                                <CtaColumn>
                                    <CtaSmallHeader>Join The future of teaching</CtaSmallHeader>
                                    <CtaSection>
                                        <CtaText>
                                            Take the edge off handing out assignments, and improve
                                            the learning process.
                                        </CtaText>
                                    </CtaSection>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={this.handleAuthRedirect}
                                    >
                                        BEGIN NOW
                                    </Button>
                                </CtaColumn>
                            </CtaSectionWrapper>
                        </div>
                        <img
                            src="/img/KnowledgeRocket_Logo_Latest_Isolated.svg"
                            alt="Space Background"
                        />
                    </HomeCTA>
                </CtaContainer>
                <MidContainer>
                    <HomeHeader>What is a Knowledge Rocket?</HomeHeader>
                    <MidSectionWrapper>
                        <MidColumn>
                            <MidHeader>
                                <StyledAssignmentIcon />
                                Implementation
                            </MidHeader>
                            <MidSection>
                                <MidSectionText>
                                    Knowledge Rockets are customizable quizzes that you create and
                                    send to your students on scheduled intervals of 2 days, 2 weeks
                                    and 2 months after the initial lecture. Rocket templates are
                                    provided for ease of creation.
                                </MidSectionText>
                            </MidSection>
                        </MidColumn>
                        <MidColumn>
                            <MidHeader>
                                <StyledAssignmentIcon />
                                Practice
                            </MidHeader>
                            <MidSection>
                                <MidSectionText>
                                    Lectures can be sometimes difficult for students to follow.
                                    Knowledge Rockets reinforce lecture information and helps
                                    students retain it.
                                </MidSectionText>
                            </MidSection>
                        </MidColumn>
                        <MidColumn>
                            <MidHeader>
                                <StyledAssignmentIcon />
                                Results
                            </MidHeader>
                            <MidSection>
                                <MidSectionText>
                                    Studies show that familiarity of class lecture retention works
                                    with reinforcement. Knowledge Rocket, with its ease of use,
                                    simplifies the instuctor's life while improving the student's
                                    comprehension.
                                </MidSectionText>
                            </MidSection>
                        </MidColumn>
                    </MidSectionWrapper>
                </MidContainer>
                <PreviewSection>
                <BottomHeader>Our New and Improved Interface</BottomHeader>
                    <img src='/img/KR_UI_SLIDESHOW.gif' alt='preview of interface'/>
                </PreviewSection>
                <FooterSection>
                    <FollowSection>
                        <NavButton onClick={this.handleContact}>CONTACT US</NavButton>
                        <a
                            href="https://twitter.com/KnowledegeR"
                            title="Knowledge Rocket on Twitter"
                        >
                            <FollowButton>TWITTER</FollowButton>
                        </a>
                        <a
                            href="https://www.facebook.com/knowledgerocket"
                            title="Knowledge Rocket on Facebook"
                        >
                            <FollowButton>FACEBOOK</FollowButton>
                        </a>
                    </FollowSection>
                </FooterSection>
            </HomeContainer>
        );
    }
}
