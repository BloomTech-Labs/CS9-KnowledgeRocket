import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { connect } from 'react-redux';
// Material Components
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// Actions
import { deleteStudent } from '../../actions';

function mapStateToProps(state) {
	return {
		state,
	};
}

const StylizedCardContent = styled(CardContent)`
	width: 200px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	margin: 10px;
`;

class CohortStudentCard extends Component {
	state = {
		anchorEl: null,
		student: {},
	};

	componentWillMount() {
		this.fetchStudentData();
	}

	fetchStudentData = () => {
		const { student } = this.props;

		// return axios
		// 	.get(`http://localhost:5000/api/student/${student}`)
		// 	.then(response => {
		// 		this.setState({ student: response.data });
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 	});
	};

	handleClick = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	handleDeleteStudent = () => {
		const studentID = this.state.student._id;
		console.log(`STUDENT ID ${this.state.student._id}`);
		this.props.deleteStudent(studentID);
	};

	handleOnClick = () => {
		this.handleClose();
	};

	render() {
		const { anchorEl } = this.state;
		const open = Boolean(anchorEl);
		let user = this.props.state.user.cohorts;
		console.log(`PROPS ${this.props.student}`);
		return (
			<StylizedCardContent>
				<h3>{this.props.student.firstName}</h3>
				<IconButton
					aria-label="More"
					aria-owns={open ? 'long-menu' : null}
					aria-haspopup="true"
					onClick={this.handleClick}
				>
					<MoreVertIcon />
				</IconButton>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={this.handleClose}
					PaperProps={{
						style: {
							// maxHeight: ITEM_HEIGHT * 4.5,
							width: 200,
						},
					}}
				>
					<MenuItem onClick={this.handleOnClick}>Remove Student</MenuItem>
				</Menu>
			</StylizedCardContent>
		);
	}
}

export default connect(mapStateToProps, {
	deleteStudent,
})(CohortStudentCard);
