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
    MidImg,
    MidSectionText,
    FooterSection,
} from './HomeStyled';

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
        return <HomeContainer>
                <HomeCTA>
                    <HomeNav>
                        <div>
                            <NavLogo src="/img/Logo_BW_SML.svg" onClick={this.handleHome} />
                        </div>
                        <div>
                            <NavButton onClick={this.handleAuthRedirect}>Sign Up</NavButton>
                            <NavButton onClick={this.handleAuthRedirect}>Sign In</NavButton>
                        </div>
                    </HomeNav>
                </HomeCTA>
                <MidContainer>
                    <HomeHeader>What is a Knowledge Rocket?</HomeHeader>
                    <MidSectionWrapper>
                        <MidColumn>
                            <MidHeader>Implementation</MidHeader>
                            <MidSection>
                                <MidImg src="/img/amanda-sandlin-10508-unsplash.jpg" />
                                <MidSectionText>
                                    Text for mid section here should not be very length but
                                    should contain enough information about this
                                    section.Text for mid section here should not be very
                                    length but should contain enough information about this
                                    section.
                                </MidSectionText>
                            </MidSection>
                        </MidColumn>
                        <MidColumn>
                            <MidHeader>Practice</MidHeader>
                            <MidSection>
                                <MidImg src="/img/erik-nielsen-783260-unsplash.jpg" />
                                <MidSectionText>
                                    Text for mid section here should not be very length but
                                    should contain enough information about this
                                    section.Text for mid section here should not be very
                                    length but should contain enough information about this
                                    section.Text for mid section here should not be very
                                    length but should contain enough information about this
                                    section.
                                </MidSectionText>
                            </MidSection>
                        </MidColumn>
                        <MidColumn>
                            <MidHeader>Results</MidHeader>
                            <MidSection>
                                <MidImg src="/img/bryan-minear-315814-unsplash.jpg" />
                                <MidSectionText>
                                    Text for mid section here should not be very length but
                                    should contain enough information about this
                                    section.Text for mid section here should not be very
                                    length but should contain enough information about this
                                    section.
                                </MidSectionText>
                            </MidSection>
                        </MidColumn>
                    </MidSectionWrapper>
                </MidContainer>
                <FooterSection>
                    <NavButton onClick={this.handleContact}>CONTACT US</NavButton>
                    <NavButton onClick={this.handleAuthRedirect}>SIGN UP</NavButton>
                    <NavButton onClick={this.handleAuthRedirect}>SIGN IN</NavButton>
                </FooterSection>
            </HomeContainer>;
    }
}
