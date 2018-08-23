import React from 'react';
import { withFormik } from 'formik';
import { object } from 'yup';
import { FormGroup, Blurb, QuestionChoices } from './FormGroup';

const rocketBlurb =
    'Knowledge rockets are short paragraphs followed by a multiple choice question. These are automatically sent two days, two weeks, and two months after a lesson is taught and are intended to cause the student to recall what they have learned. The rockets should not be used to provide exhaustive review. Instead, they ask the student to "reload" the mental maps that acquired during the lesson.';

const RocketFormBase = ({ values, handleSubmit, handleChange, handleBlur, errors }) => (
    <form onSubmit={handleSubmit}>
        <FormGroup>
            <label htmlFor="title" />
            <input
                name="title"
                value={values.td.title}
                placeholder="Title"
                onChange={handleChange}
            />
        </FormGroup>
        <FormGroup>
            <Blurb>{rocketBlurb}</Blurb>
        </FormGroup>

        {/* ROCKET QUESTION SECTION 1*/}
        <QuestionChoices
            values={values}
            handleBlur={handleBlur}
            handleChange={handleChange}
            increment="td"
            errors={errors.td}
        />

        {/* ROCKET QUESTION SECTION 2*/}
        <QuestionChoices
            values={values}
            handleBlur={handleBlur}
            handleChange={handleChange}
            increment="tw"
            errors={errors.tw}
        />

        {/* ROCKET QUESTION SECTION 3*/}
        <QuestionChoices
            values={values}
            handleBlur={handleBlur}
            handleChange={handleChange}
            increment="tm"
            errors={errors.tm}
        />

        <button type="submit">submit</button>
    </form>
);

const defaultProps = {
    td: generateDefaults(),
    tw: generateDefaults(),
    tm: generateDefaults(),
    title: '',
};

const RocketForm = withFormik({
    handleSubmit: (values, actions) => {
        actions.props.handleSubmit(values)
        actions.props.history.push('/rocket')
        console.log(values, actions);
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

function generateDefaults() {
    return {
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
    };
}
