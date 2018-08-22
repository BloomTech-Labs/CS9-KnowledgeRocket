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
        handleBlur,
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
                <label>
                    <input
                        name="td.correct"
                        checked={values.td.choices[0].correct}
                        type="radio"
                        onChange={handleChange}
                    />
                    Choice 1
                </label>
                <label>
                    <input
                        name="td.correct"
                        checked={values.td.choices[1].correct}
                        type="radio"
                        onChange={handleChange}
                    />
                    Choice 2
                </label>
                <label>
                    <input
                        name="td.correct"
                        checked={values.td.choices[2].correct}
                        type="radio"
                        onChange={handleChange}
                    />
                    Choice 3
                </label>
                <label>
                    <input
                        name="td.correct"
                        checked={values.td.choices[3].text === values.td.correct}
                        value={values.td.choices[3].text}
                        type="radio"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <input
                        name="td.choices[3].text"
                        type="text"
                        onChange={handleChange}
                        value={values.td.choices[3].text}
                    />
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
                text: 'Answer 1',
            },
            {
                text: 'Answer 2',
            },
            {
                text: 'Answer 3',
            },
            {
                text: 'Answer 4',
            },
        ],
        correct: '',
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
