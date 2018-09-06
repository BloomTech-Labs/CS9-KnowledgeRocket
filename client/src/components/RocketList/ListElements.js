import Styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ListElements.css';
//////
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';
import { smallBreakPoint } from '../Themes/Themes';

export const RocketListContainer = Styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    ${smallBreakPoint(`
        align-items: center;
    `)}
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
    height: 1rem;
    justify-content: flex-end;
`;

export const RocketCardMid = Styled.div`
    display: flex;
    flex-direction: column;
    align-items: ${props => (props.del ? 'flex-start' : 'center')};
    width: 100%;
    height: 100%;
`;

export const RocketCardHeader = Styled.div`
    font-size: 2rem;
`;

export const HorizontalDivider = Styled.hr`
    border: 1px solid black;
`;

export const AddButton = Styled.div`
    .nestedAdd {
        position: ${props => (props.floating ? 'absolute' : 'inherit')};
        right: ${props => (props.floating ? '1rem' : 'none')};
        bottom: ${props => (props.floating ? '1rem' : 'none')};
    }
    width: 4rem;
    height: inherit;
    position: ${props => (props.floating ? 'relative' : 'inherit')}
    ${props => (props.floating ? 'margin-top: 100vh' : 'margin-top: 1.8rem')};
    text-align: center;
    color: white;
    text-shadow: -1px -1px 0 #000 , 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0px 0px 8px #000000dd;
`;

export const ListWrapper = Styled.div`
    display: flex; 
    justify-content: space-between; 
    width: 100%;
`;

export const DelButton = Styled.svg`
    &:hover {
        fill: red;
        cursor: pointer;
    }
`;

export const FloatingAdd = props => {
    let mini = props.large ? false : true;
    return (
        <AddButton floating={props.floating}>
            <div className="nestedAdd">
                <p style={{ marginBottom: '0.5rem' }}>{props.title}</p>

                <Button variant="fab" color="primary" mini={mini} onClick={props.click}>
                    <AddIcon />
                </Button>
            </div>
        </AddButton>
    );
};

export const OkIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
        </svg>
    );
};

export const CancelIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <path d="M9 1C4.58 1 1 4.58 1 9s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm4 10.87L11.87 13 9 10.13 6.13 13 5 11.87 7.87 9 5 6.13 6.13 5 9 7.87 11.87 5 13 6.13 10.13 9 13 11.87z" />
        </svg>
    );
};
/////

const options = ['Delete Permanently', 'Cancel'];
const styles = {
    cancel: {
        backgroundColor: green[100],
        color: green[600],
    },
    ok: {
        backgroundColor: pink[100],
        color: green[600],
    },
};

class SimpleDialog extends Component {
    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    handleListItemClick = value => {
        this.props.onClose(value);
    };

    render() {
        const { classes, onClose, selectedValue, ...other } = this.props;

        return (
            <Dialog onClose={this.handleClose} {...other}>
                <DialogTitle id="DeleteDialog">Delete Rocket?</DialogTitle>
                <div>
                    <List>
                        {options.map((opt, index) => (
                            <ListItem
                                button
                                onClick={() => this.handleListItemClick(opt)}
                                key={opt.id || `${opt}_${index}`}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        className={opt === 'Cancel' ? classes.cancel : classes.ok}
                                    >
                                        {opt === 'Cancel' ? <CancelIcon /> : <OkIcon />}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={opt} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Dialog>
        );
    }
}

SimpleDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

class DeleteDialog extends Component {
    state = {
        open: false,
        selectedValue: options[1],
    };

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = value => {
        if (value !== 'Cancel') {
            this.props.deleteFunction();
        }
        this.setState({ selectedValue: value, open: false });
    };

    render() {
        return (
            <div>
                <DelButton
                    onClick={this.handleClickOpen}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                >
                    <path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </DelButton>
                <SimpleDialogWrapped
                    selectedValue={this.state.selectedValue}
                    open={this.state.open}
                    onClose={this.handleClose}
                />
            </div>
        );
    }
}

/////

export const ListCard = props => {
    /* Expected Props
        contents: array of html elements
        title: string
        redirect: string
        click: function for onClick
        button_label: string
        del: function
    */
    const generateKey = (pre, aft) => {
        return `${pre}_${new Date().getTime()}_${aft}`;
    };
    const click = e => {
        return props.click ? props.click(e, props.element) : null;
    };

    const del = e => {
        return props.del ? props.del(e, props.element) : null;
    };
    //<svg className='Del_SVG' onClick={del} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
    // <DelButton onClick={del} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></DelButton>
    return (
        <RocketListCard>
            <StyledCardContent>
                <RocketCardTop del={props.del}>
                    {props.del ? (
                        <div>
                            <DeleteDialog deleteFunction={del} />
                        </div>
                    ) : (
                        <div>
                            <div style={{ visibility: 'hidden', height: '24px' }}>
                                <div>{''}</div>
                            </div>
                        </div>
                    )}
                </RocketCardTop>
                {props.add ? (
                    <RocketCardMid del={props.del}>
                        <div>
                            <RocketCardHeader>{props.title}</RocketCardHeader>
                            <HorizontalDivider />
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                {props.contents.map((Item, index) => {
                                    const key = generateKey(props.title, index);
                                    return (
                                        <div
                                            key={key}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: '100%',
                                                height: '100%',
                                            }}
                                        >
                                            {Item}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </RocketCardMid>
                ) : (
                    <RocketCardMid>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                width: '100%',
                            }}
                        >
                            <RocketCardHeader>{props.title}</RocketCardHeader>
                            <HorizontalDivider style={{ width: '100%' }} />
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    height: '95px',
                                }}
                            >
                                {props.contents.map(content => {
                                    return content;
                                })}
                            </div>
                        </div>
                    </RocketCardMid>
                )}

                {props.add ? null : (
                    <Link to={props.redirect} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary" onClick={click}>
                            {props.label ? props.label : 'View'}
                        </Button>
                    </Link>
                )}
            </StyledCardContent>
        </RocketListCard>
    );
};
