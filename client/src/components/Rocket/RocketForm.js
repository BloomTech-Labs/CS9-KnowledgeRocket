import React from 'react';
import { withFormik } from 'formik';
import { object, string } from 'yup';

const RocketFormBase = props => {
    const { values, errors, dirty, touched, handleSubmit, handleChange, setFieldValue } = props;
    console.log(props);
    return (
        <form>
            <div>
                <input name="tdtitle" value={values.td.title} onChange={handleChange} />
                <label htmlFor="tdtitle">as;ldkfj</label>
            </div>
            <button type="submit" onClick={handleSubmit}>
                submit
            </button>
        </form>
    );
};

const RocketForm = withFormik({
    handleSubmit: (values, actions) => {
        console.log(values);
    },
    mapPropsToValues: props => {
        console.log(props);
        // if defaultState, set defaultState
        return {
            td: { ...props.td },
        };
    },
    validationSchema: object().shape({}),
    displayName: 'RocketForm',
})(RocketFormBase);

export default RocketForm;
