import Styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

export const RocketListContainer = Styled.div`
    ${props => console.log(props.theme)};
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
`;

export const RocketListCard = Styled(Card)`
    margin: 1rem 1rem 0 0;
    width: 20rem;
    height: 16rem;
`;

export const StyledCardContent = Styled(CardContent)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 16rem;
`;

export const RocketCardTop = Styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
`;

export const RocketCardMid = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: ${props => props.del ? 'flex-start': 'center'};
    width: 100%;
    height: 10rem;
`;

export const RocketCardHeader = Styled.div`
    font-size: 2rem;
`;

export const HorizontalDivider = Styled.hr`
    border: 1px solid black;
`;

export const AddButton = Styled.div`
    width: 4rem;
    height: inherit;
    position: ${props => (props.floating ? 'absolute' : 'inherit')}
    right: 2.5rem;
    bottom: 2.5rem;
    text-align: center;
    color: white;
    text-shadow: -1px -1px 0 #000 , 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0px 0px 8px #000000dd;
`;

export const ListWrapper = Styled.div`
    display: flex; 
    justify-content: space-between; 
    width: 100%;
`;

export const FloatingAdd = props => {
    let mini = props.large ? false : true;
    return (
        <AddButton floating={props.floating}>
            <p style={{ marginBottom: '0.5rem' }}>{props.title}</p>
            
            <Button variant="fab" color="primary" mini={mini} onClick={props.click}>
                <AddIcon />
            </Button>
        </AddButton>
    );
};

export const ListCard = props => {
    /* Expected Props
        contents: array of html elements
        title: string
        redirect: string
        click: function for onClick
        button_label: string
        del: function
    */
    const click = e => {
        return props.click ? props.click(e, props.element) : null;
    };

    const del = e => {
        return props.del ? props.del(e, props.element) : null;
    };
    return (
        <RocketListCard>
            <StyledCardContent>
                <RocketCardTop del={props.del}>
                    {props.del ? (
                        <Tooltip title="Delete Permanently">
                            <Button variant="fab" color="secondary" onClick={del} mini>
                                <DeleteIcon />
                            </Button>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Delete Permanently">
                        <Button
                            variant="fab"
                            color="secondary"
                            mini
                            style={{ visibility: 'hidden' }}
                        >
                            <div></div>
                        </Button>
                        </Tooltip>
                    )}
                </RocketCardTop>
                {props.del ? (
                    <RocketCardMid del={props.del}>
                        <div>
                            <RocketCardHeader>{props.title}</RocketCardHeader>
                            <HorizontalDivider />
                            {props.contents.map((Item, index) => {
                                return <div key={index + ''}>{Item}</div>;
                            })}
                        </div>
                    </RocketCardMid>
                ) : (
                    <RocketCardMid>
                        <div style={{display: 'flex',flexDirection: 'column' ,alignItems: 'center'}}>
                            <RocketCardHeader>{props.title}</RocketCardHeader>
                            <HorizontalDivider />
                            {props.contents.map(content =>{
                                return content;
                            })}
                        </div>
                    </RocketCardMid>
                )}

                {props.del ? (
                    <Link to={props.redirect} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary" onClick={click}>
                            {props.label ? props.label : 'View'}
                        </Button>
                    </Link>
                ) : null}
            </StyledCardContent>
        </RocketListCard>
    );
};
