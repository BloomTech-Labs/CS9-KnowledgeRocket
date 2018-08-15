import React from "react";
import PropTypes from "prop-types";


const InfoCard = props => {
    
        return (<div >
            <img src={props.img} />
            <h3>{props.title}</h3>
            <p>{props.content}</p>
            <a href={props.toText} ></a>
        </div>)
    
}

InfoCard.propTypes = {
    content: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    toText: PropTypes.string.isRequired
}

export {InfoCard}