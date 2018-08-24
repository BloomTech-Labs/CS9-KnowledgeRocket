import React from 'react';
import { withFormik } from 'formik';
import { object, string, array } from 'yup';
import { FormGroup, Blurb, QuestionChoices, ErrorText, errorHelper } from './FormGroup';

const rocketBlurb =
    'Knowledge rockets are short paragraphs followed by a multiple choice question. These are automatically sent two days, two weeks, and two months after a lesson is taught and are intended to cause the student to recall what they have learned. The rockets should not be used to provide exhaustive review. Instead, they ask the student to "reload" the mental maps that acquired during the lesson.';

const RocketFormBase = ({ values, handleSubmit, handleChange, handleBlur, errors, touched }) => {
    const displayError = errorHelper(errors, touched);
    return (
        <form onSubmit={handleSubmit}>
            <FormGroup>
                <label htmlFor="title" />
                <input
                    name="title"
                    value={values.title}
                    placeholder="Title"
                    onChange={handleChange}
                />
                <ErrorText>{displayError('title')}</ErrorText>
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
                touched={touched.td}
            />

            {/* ROCKET QUESTION SECTION 2*/}
            <QuestionChoices
                values={values}
                handleBlur={handleBlur}
                handleChange={handleChange}
                increment="tw"
                errors={errors.tw}
                touched={touched.tw}
            />

            {/* ROCKET QUESTION SECTION 3*/}
            <QuestionChoices
                values={values}
                handleBlur={handleBlur}
                handleChange={handleChange}
                increment="tm"
                errors={errors.tm}
                touched={touched.tm}
            />

            <button type="submit">submit</button>
        </form>
    );
};

const defaultProps = {
    td: generateDefaults(),
    tw: generateDefaults(),
    tm: generateDefaults(),
    title: '',
};

const RocketForm = withFormik({
    handleSubmit: (values, actions) => {
        actions.props.handleSubmit(values);
        actions.props.history.push('/rocket');
    },
    mapPropsToValues: props => {
        // overwrite defaults with props
        Object.assign(defaultProps, { ...props });
        return defaultProps;
    },
    validationSchema: object().shape({
        title: string()
            .trim()
            .required('Title is required.'),
        td: rocketShape(),
        tw: rocketShape(),
        tm: rocketShape(),
    }),
    displayName: 'RocketForm',
})(RocketFormBase);

export default RocketForm;

function rocketShape() {
    return object().shape({
        explanation: string()
            .trim()
            .required('Review Text is required.'),
        question: string()
            .trim()
            .required('You must include a question.'),
        correct: string()
            .trim()
            .required('You must choose a correct answer.'),
        choices: array().of(
            string()
                .trim()
                .min(1)
                .required()
        ),
    });
}

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
