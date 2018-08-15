import React from "react";
import Styled from "styled-components";
import PropTypes from "prop-types";

const InfoCardContainer = Styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
`;
const InfoCardImage = Styled.img.attrs({
  src: ({ img }) => (img ? img : "#"),
  alt: ({ alt }) => (alt ? alt : "")
})`
`;
const InfoCardTitle = Styled.h3``;
const InfoCardContent = Styled.p``;
const InfoCardAnchor = Styled.a``;

const InfoCard = props => {
  return (
    <InfoCardContainer>
      <InfoCardImage img={props.img} />
      <InfoCardTitle>{props.title}</InfoCardTitle>
      <InfoCardContent>{props.content}</InfoCardContent>
      <InfoCardAnchor href={props.to}>{props.toText}</InfoCardAnchor>
    </InfoCardContainer>
  );
};

InfoCard.propTypes = {
  content: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  toText: PropTypes.string.isRequired
};

export { InfoCard, InfoCardContainer };
