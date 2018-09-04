import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Papa from 'papaparse';
// Material Components
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
// Actions
import { importCSV, exportCSV } from '../../actions/';

function mapStateToProps(state) {
	return {
		state,
	};
}

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
		color: 'white',
	},
});

const StylizedInput = styled(Input)`
	padding: 0.5rem;
	background-color: #f2f7ff;
	border-radius: 0.25rem;
	order: 0;
	width: 100%;
	@media (min-width: 500px) {
		width: 50%;
	}
`;

const StylizedForm = styled.form`
	border-radius: 0.25rem;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
`;

const StylizedCSVInput = styled.input`
	overflow: hidden;
	position: absolute;
	width: 0.1px;
	opacity: 0;
	z-index: -10;
	height: 0.1px;
`;

const ExportCSVBtn = styled(Button)`
	background-color: #3f51b5 !important;
`;

const StyledLabel = styled.label`
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	color: white;
	background-color: #3f51b5;
	border-radius: 0.25rem;
	padding: 0.6rem 0.8rem;
	order: 1;
	box-shadow: 0px 1px 3px 0px rgba(15, 12, 12, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
		0px 2px 1px -1px rgba(0, 0, 0, 0.12);
	&:hover {
		background-color: #303f9f;
	}
`;

const StyledFormControlLabel = styled(FormControlLabel)`
	order: 2;
	padding-right: 0.5rem;
	margin-right: 0.5rem;
`;

// const MyCheckBox = styled.div`
//     padding: .2rem;
//     border: #f2f7ff;
// `

// CONTAINS SETTINGS: CLASS NAME, CC CHECKBOX, IMPORT CSV
class CohortSettingForm extends Component {
	state = {
		csvData: [],
		cohort: {
			ccEmail: false,
			rockets: { _id: '', rocketId: '', startDate: '', td: '', tw: '', tm: '' },
			students: [{}],
			title: '',
			_id: '',
		},
	};

	componentDidMount() {
		let cohort = this.props.state.user.cohorts[this.props.cohortIDX];
		this.setState({ cohort });
	}

	handleExportStudents = event => {
		const teacherID = this.props.state.user._id;
		const cohortID = this.props.cohortID;
		console.log('MADE IT TO handleExportStudents IN CohortSettingForm');
		this.props.exportCSV(teacherID, cohortID);
	};

	handleFileSelect = event => {
		const teacherID = this.props.state.user._id;
		const cohortID = this.props.cohortID;
		let studentData;

		const file = event.target.files[0];
		const config = {
			quoteChar: '"',
			header: true,
			preview: 0,
			complete: (results, file) => {
				studentData = results.data;
				this.props.importCSV(teacherID, cohortID, studentData);
				this.setState({ csvData: results });
			},
		};
		if (file) {
			return Papa.parse(file, config);
		}
	};

	handleCheckBox = (one, two) => {
		this.setState({ cohort: { ...this.state.cohort, ccEmail: !this.state.cohort.ccEmail } });
	};

	handleNewInput = e => {
		this.setState({ cohort: { ...this.state.cohort, [e.target.name]: e.target.value } });
	};

	handleAddCohort = () => {
		const cohort = {
			title: this.state.cohort.title,
			ccEmail: this.state.cohort.ccEmail,
		};
		if (this.state.cohort._id !== '') {
			cohort._id = this.state.cohort._id;
		}
		this.props.addCohort(cohort, this.props.state.user._id);
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={this.props.className}>
				<StylizedInput
					disableUnderline={true}
					name="title"
					onChange={this.handleNewInput}
					onBlur={this.handleNewInput}
					placeholder={this.state.cohort.title === '' ? 'Class Name' : this.state.cohort.title}
				/>
				<StylizedForm>
					<StyledLabel for="csv-file">Import CSV</StyledLabel>
					<StylizedCSVInput
						type="file"
						id="csv-file"
						name="files"
						onChange={this.handleFileSelect}
					/>
				</StylizedForm>
				<ExportCSVBtn
					variant="contained"
					className={classes.button}
					onClick={this.handleExportStudents}
				>
					Export CSV
				</ExportCSVBtn>
				<StyledFormControlLabel
					control={
						<Checkbox
							onChange={e => this.handleCheckBox(e, this)}
							name="ccEmail"
							checked={this.state.cohort.ccEmail}
						/>
					}
					label="CC Me on Rocket Emails"
				/>
				<Button variant="contained" color="primary" onClick={this.handleAddCohort}>
					Add this Cohort
				</Button>
			</div>
		);
	}
}

export default connect(mapStateToProps, {
	importCSV,
	exportCSV,
})(withStyles(styles)(CohortSettingForm));
