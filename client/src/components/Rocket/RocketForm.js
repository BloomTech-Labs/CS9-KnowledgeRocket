import React from 'react';
import { withFormik } from 'formik';
import { object, string } from 'yup';
import './RocketForm.css';

const rocketBlurb =
    'Knowledge rockets are short paragraphs followed by a multiple choice question. These are automatically sent two days, two weeks, and two months after a lesson is taught and are intended to cause the student to recall what they have learned. The rockets should not be used to provide exhaustive review. Instead, they ask the student to "reload" the mental maps that acquired during the lesson.';

const RocketFormBase = props => {
    const { values, errors, dirty, touched, handleSubmit, handleChange, setFieldValue } = props;
    console.log(props);
    return (
        <form>
            <div className="RocketForm_wrapper">
                <label htmlFor="title" />
                <input
                    name="title"
                    value={values.td.title}
                    placeholder="Title"
                    onChange={handleChange}
                />
            </div>
            <div className="RocketForm_wrapper">
                <p>{rocketBlurb}</p>
            </div>
            {/* ROCKET QUESTION SECTION 1*/}
            <div className="RocketForm_wrapper">
                <label htmlFor="title">{'Two Days - Review Text'}</label>
                <textarea
                    name="title"
                    value={values.td.title}
                    placeholder="Two Day Review Text"
                    onChange={handleChange}
                    style={{ width: '100%', height: '4rem' }}
                />
            </div>
            <div className="RocketForm_wrapper">
                <label htmlFor="title">{'Two Days - Review Question'}</label>
                <textarea
                    name="title"
                    value={values.td.title}
                    placeholder="Two Day Review Text"
                    onChange={handleChange}
                    style={{ width: '100%', height: '4rem' }}
                />
            </div>
            <div className="RocketForm_questions_section">
                <div className="RocketForm_question_wrapper">
                    <input type="radio" />
                    <label htmlFor="title" />
                    <input
                        name="title"
                        value={values.td.title}
                        placeholder="Answer 1"
                        onChange={handleChange}
                        className="questionField"
                    />
                </div>
                <div className="RocketForm_question_wrapper">
                    <input type="radio" />
                    <label htmlFor="title" />
                    <input
                        name="title"
                        value={values.td.title}
                        placeholder="Answer 2"
                        onChange={handleChange}
                        className="questionField"
                    />
                </div>
                <div className="RocketForm_question_wrapper">
                    <input type="radio" />
                    <label htmlFor="title" />
                    <input
                        name="Answer 2"
                        value={values.td.title}
                        placeholder="Answer 3"
                        onChange={handleChange}
                        className="questionField"
                    />
                </div>
                <div className="RocketForm_question_wrapper">
                    <input type="radio" />
                    <label htmlFor="title" />
                    <input
                        name="title"
                        value={values.td.title}
                        placeholder="Answer 4"
                        onChange={handleChange}
                        className="questionField"
                    />
                </div>
            </div>
            {/* ROCKET QUESTION SECTION 2*/}
            <div className="RocketForm_wrapper">
                <label htmlFor="title">{'Two Weeks - Review Text'}</label>
                <textarea
                    name="title"
                    value={values.td.title}
                    placeholder="Two Weeks Review Text"
                    onChange={handleChange}
                    style={{ width: '100%', height: '4rem' }}
                />
            </div>
            <div className="RocketForm_wrapper">
                <label htmlFor="title">{'Two Weeks - Review Question'}</label>
                <textarea
                    name="title"
                    value={values.td.title}
                    placeholder="Two Weeks Review Text"
                    onChange={handleChange}
                    style={{ width: '100%', height: '4rem' }}
                />
            </div>
            <div className="RocketForm_questions_section">
                <div className="RocketForm_question_wrapper">
                    <input type="radio" />
                    <label htmlFor="title" />
                    <input
                        name="title"
                        value={values.td.title}
                        placeholder="Answer 1"
                        onChange={handleChange}
                        className="questionField"
                    />
                </div>
                <div className="RocketForm_question_wrapper">
                    <input type="radio" />
                    <label htmlFor="title" />
                    <input
                        name="title"
                        value={values.td.title}
                        placeholder="Answer 2"
                        onChange={handleChange}
                        className="questionField"
                    />
                </div>
                <div className="RocketForm_question_wrapper">
                    <input type="radio" />
                    <label htmlFor="title" />
                    <input
                        name="Answer 2"
                        value={values.td.title}
                        placeholder="Answer 3"
                        onChange={handleChange}
                        className="questionField"
                    />
                </div>
                <div className="RocketForm_question_wrapper">
                    <input type="radio" />
                    <label htmlFor="title" />
                    <input
                        name="title"
                        value={values.td.title}
                        placeholder="Answer 4"
                        onChange={handleChange}
                        className="questionField"
                    />
                </div>
            </div>
            {/* ROCKET QUESTION SECTION 3*/}
            <div className="RocketForm_wrapper">
                <label htmlFor="title">{'Two Months - Review Text'}</label>
                <textarea
                    name="title"
                    value={values.td.title}
                    placeholder="Two Months Review Text"
                    onChange={handleChange}
                    style={{ width: '100%', height: '4rem' }}
                />
            </div>
            <div className="RocketForm_wrapper">
                <label htmlFor="title">{'Two Months - Review Question'}</label>
                <textarea
                    name="title"
                    value={values.td.title}
                    placeholder="Two Months Review Text"
                    onChange={handleChange}
                    style={{ width: '100%', height: '4rem' }}
                />
            </div>
            <div className="RocketForm_questions_section">
                <div className="RocketForm_question_wrapper">
                    <input type="radio" />
                    <label htmlFor="title" />
                    <input
                        name="title"
                        value={values.td.title}
                        placeholder="Answer 1"
                        onChange={handleChange}
                        className="questionField"
                    />
                </div>
                <div className="RocketForm_question_wrapper">
                    <input type="radio" />
                    <label htmlFor="title" />
                    <input
                        name="title"
                        value={values.td.title}
                        placeholder="Answer 2"
                        onChange={handleChange}
                        className="questionField"
                    />
                </div>
                <div className="RocketForm_question_wrapper">
                    <input type="radio" />
                    <label htmlFor="title" />
                    <input
                        name="Answer 2"
                        value={values.td.title}
                        placeholder="Answer 3"
                        onChange={handleChange}
                        className="questionField"
                    />
                </div>
                <div className="RocketForm_question_wrapper">
                    <input type="radio" />
                    <label htmlFor="title" />
                    <input
                        name="title"
                        value={values.td.title}
                        placeholder="Answer 4"
                        onChange={handleChange}
                        className="questionField"
                    />
                </div>
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
