import React, { Component } from 'react';
// Material Components
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
	close: {
		width: theme.spacing.unit * 4,
		height: theme.spacing.unit * 4,
	},
});

// NOTIFIES USER OF APPLICATION EVENTS
class SnackBar extends Component {
	state = {
		open: false,
	};

	componentDidMount() {
		this.setState({ open: this.props.open });
	}

	handleRequestClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { classes } = this.props;
		console.log(`SNACKBAR PROPS ${JSON.stringify(this.props)}`);
		return (
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
				message={<span id="message-id">{this.props.message}</span>}
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
		);
	}
}

export default withStyles(styles)(Snackbar);
