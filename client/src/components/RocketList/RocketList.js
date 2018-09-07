import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generateBreadCrumbs, deleteRocket, clearSnackMessage } from '../../actions';
import { RocketListContainer, FloatingAdd, ListWrapper, ListCard } from './ListElements';
// Material Components
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

function mapStateToProps(state) {
    return {
        state,
    };
}

const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

class RocketList extends Component {
    state = {
        rocketCounter: {},
        open: true,
    };
    componentDidMount() {
        // Checks for User to be Authenticated
        // If not authenticated it will send the user to <login/>
        // If authenticated it will set the state with the current user.
        if (!this.props.state.user.authenticated) {
            this.props.history.push('/rocket/auth');
        }
        // Getting Total Rockets assigned to cohort for each rocket.
        let rocketCounter = {};
        this.props.state.user.cohorts.forEach((c, ci) => {
            c.rockets.forEach((r, ri) => {
                if (rocketCounter[`${r.rocketId._id}`] === undefined) {
                    rocketCounter[`${r.rocketId._id}`] = 1;
                } else if (rocketCounter[`${r.rocketId._id}`]) {
                    rocketCounter[`${r.rocketId._id}`] += 1;
                }
            });
        });
        this.setState({ rocketCounter });
        // Do not Remove top Lines: needed for Rocket List

        this.props.generateBreadCrumbs(this.props.history.location.pathname);
    }

    handleNewRocket = e => {
        this.props.history.push('/rocket/new');
    };

    handleDeleteRocket = (e, element) => {
        this.props.deleteRocket(element._id);
    };

    handleRequestClose = () => {
        this.setState({ open: false });
        this.props.clearSnackMessage();
    };

    render() {
        const { classes } = this.props;
        const { message } = this.props.state.user;
        const { status } = this.props.state.user;
        return (
            <ListWrapper>
                <RocketListContainer>
                    <ListCard
                        del={false}
                        add={true}
                        redirect="/rocket/new"
                        title="Add New Rocket"
                        label="Add"
                        contents={[
                            <FloatingAdd id={'Floating_Add'} large click={this.handleNewRocket} />,
                        ]}
                    />
                    {this.props.state.user.rockets.map((rocket, index) => {
                        return (
                            <ListCard
                                key={`RL_${index}_${rocket._id}`}
                                contents={[
                                    <p
                                        id={`ClassesAssigned_${rocket._id}`}
                                        key={`ClassesAssigned_${rocket._id}`}
                                    >
                                        {`Classes Assigned:\t`}
                                        <span style={{ fontWeight: '900' }}>{`(${
                                            this.state.rocketCounter[rocket._id]
                                                ? this.state.rocketCounter[rocket._id]
                                                : 0
                                        })`}</span>
                                    </p>,
                                ]}
                                title={rocket.title}
                                redirect={`/rocket/view/${rocket._id}`}
                                del={this.handleDeleteRocket}
                                element={rocket}
                                label={'Edit'}
                            />
                        );
                    })}

                    {status === 'ADD_ROCKET' || status === 'DELETE_ROCKET' ? (
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={this.state.open}
                            autoHideDuration={5000}
                            onClose={this.handleRequestClose}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">{message}</span>}
                            action={[
                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    className={classes.close}
                                    onClick={this.handleRequestClose}
                                >
                                    <CloseIcon />
                                </IconButton>,
                            ]}
                        />
                    ) : null}
                </RocketListContainer>
            </ListWrapper>
        );
    }
}

export default connect(
    mapStateToProps,
    { generateBreadCrumbs, deleteRocket, clearSnackMessage }
)(withStyles(styles)(RocketList));
