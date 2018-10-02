import React from 'react';
import { withFormik } from 'formik';
import { object, string, array, number } from 'yup';
import {
    FormGroup,
    Blurb,
    QuestionChoices,
    ErrorText,
    errorHelper,
    StyledSection,
} from './FormGroup';
import Button from '@material-ui/core/Button';

const rocketBlurb =
    'Knowledge rockets are short paragraphs followed by a multiple choice question. These are automatically sent two days, two weeks, and two months after a lesson is taught and are intended to cause the student to recall what they have learned. The rockets should not be used to provide exhaustive review. Instead, they ask the student to "reload" the mental maps that acquired during the lesson.';

const RocketFormBase = ({
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    newForm,
}) => {
    const displayError = errorHelper(errors, touched);
    return (
        <form onSubmit={handleSubmit}>
            <StyledSection>
                <FormGroup>
                    <div htmlFor="title" className="mainTitle">
                        <input
                            name="title"
                            value={values.title}
                            placeholder="Title"
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        <ErrorText left>{displayError('title')}</ErrorText>
                    </div>
                </FormGroup>
                <FormGroup>
                    <Blurb>{rocketBlurb}</Blurb>
                    {newForm && <div className="requiredFields">All fields are required.</div>}
                </FormGroup>
            </StyledSection>
            {/* ROCKET QUESTION SECTION 1*/}
            <QuestionChoices
                values={values}
                handleBlur={handleBlur}
                handleChange={handleChange}
                interval="td"
                errors={errors.td}
                touched={touched.td}
            />

            {/* ROCKET QUESTION SECTION 2*/}
            <QuestionChoices
                values={values}
                handleBlur={handleBlur}
                handleChange={handleChange}
                interval="tw"
                errors={errors.tw}
                touched={touched.tw}
            />

            {/* ROCKET QUESTION SECTION 3*/}
            <QuestionChoices
                values={values}
                handleBlur={handleBlur}
                handleChange={handleChange}
                interval="tm"
                errors={errors.tm}
                touched={touched.tm}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginBottom: '1rem' }}
            >
                Submit
            </Button>
        </form>
    );
};

export const generateDefaults = () => {
    return {
        explanation: '',
        question: '',
        choices: [
            {
                text: '',
            },
            {
                text: '',
            },
            {
                text: '',
            },
            {
                text: '',
            },
        ],
        correct: 0,
    };
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
        correct: number().required('You must choose a correct answer.'),
        choices: array().of(
            object().shape({
                text: string()
                    .trim()
                    .min(1)
                    .required(`Answer text can't be empty`),
            })
        ),
    });
}
