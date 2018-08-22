import React from 'react';
import { withFormik } from 'formik';
import { object, string } from 'yup';

const RocketFormBase = props => {
    const {
        values,
        errors,
        dirty,
        touched,
        handleSubmit,
        handleChange,
        setFieldValue,
        isSubmitting,
    } = props;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input name="title" value={values.title} onChange={handleChange} />
                <div>chars/maxChars</div>
            </div>
            <div>
                <label htmlFor="tdexplanation">Two Days - Review Text</label>
                <input name="tdexplanation" value={values.td.explanation} onChange={handleChange} />
                <div>chars/maxChars</div>
            </div>
            <div>
                <label htmlFor="tdquestion">Two Weeks - Review Text</label>
                <input name="tdquestion" value={values.td.question} onChange={handleChange} />
                <div>chars/maxChars</div>
            </div>
            <fieldset>
                <label htmlFor="td.choices[0].correct">
                    <input
                        name="td.choices[0].correct"
                        checked={values.td.choices[0].correct}
                        type="radio"
                        onChange={e => {
                            e.persist();
                            console.log(e);
                            handleChange(e);
                        }}
                    />
                    Choice 1
                </label>
                <label htmlFor="td.choices[1].correct">
                    <input
                        name="td.choices[1].correct"
                        checked={values.td.choices[1].correct}
                        type="radio"
                        onChange={handleChange}
                    />
                    Choice 2
                </label>
                <label htmlFor="td.choices[2].correct">
                    <input
                        name="td.choices[2].correct"
                        checked={values.td.choices[2].correct}
                        type="radio"
                        onChange={handleChange}
                    />
                    Choice 3
                </label>
                <label htmlFor="td.choices[3].correct">
                    <input
                        name="td.choices[3].correct"
                        checked={values.td.choices[3].correct}
                        type="radio"
                        onChange={e => {
                            e.preventDefault();
                            setFieldValue('td.choices[3].correct', !values.td.choices[3].correct);
                        }}
                    />
                    Choice 4
                </label>
            </fieldset>
            <button type="submit" disabled={isSubmitting}>
                submit
            </button>
        </form>
    );
};

const defaultProps = {
    td: {
        explanation: '',
        question: '',
        choices: [
            {
                text: '',
                correct: false,
            },
            {
                text: '',
                correct: false,
            },
            {
                text: '',
                correct: false,
            },
            {
                text: '',
                correct: false,
            },
        ],
    },
    title: '',
};

const RocketForm = withFormik({
    handleSubmit: (values, actions) => {
        console.log(values);
    },
    mapPropsToValues: props => {
        // overwrite defaults with props
        Object.assign(defaultProps, props);
        return defaultProps;
    },
    validationSchema: object().shape({}),
    displayName: 'RocketForm',
})(RocketFormBase);

export default RocketForm;
