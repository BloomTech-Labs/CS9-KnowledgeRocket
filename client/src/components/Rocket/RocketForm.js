import React from 'react';
import Styled from 'styled-components';
import { withFormik } from 'formik';
import { object } from 'yup';
import './RocketForm.css';

const rocketBlurb =
    'Knowledge rockets are short paragraphs followed by a multiple choice question. These are automatically sent two days, two weeks, and two months after a lesson is taught and are intended to cause the student to recall what they have learned. The rockets should not be used to provide exhaustive review. Instead, they ask the student to "reload" the mental maps that acquired during the lesson.';

const FormGroup = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

const Blurb = Styled.p`
    margin: 1rem 0;
    text-align: justify;
`;

const TextArea = Blurb.extend``.withComponent('textarea');

const QuestionsSection = Styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;
`;

const RocketFormBase = props => {
    const { values, handleSubmit, handleChange, handleBlur } = props;

    return (
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
            <section>
                <FormGroup>
                    <label htmlFor="td.explanation">{'Two Days - Review Text'}</label>
                    <TextArea
                        name="td.explanation"
                        value={values.td.explanation}
                        placeholder="Two Day Review Text"
                        onChange={handleChange}
                        style={{ width: '100%', height: '4rem' }}
                    />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="td.question">{'Two Days - Review Question'}</label>
                    <TextArea
                        name="td.question"
                        value={values.td.question}
                        placeholder="Two Day Review Text"
                        onChange={handleChange}
                        style={{ width: '100%', height: '4rem' }}
                    />
                </FormGroup>
                <QuestionsSection>
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
                </QuestionsSection>
            </section>

            {/* ROCKET QUESTION SECTION 2*/}
            <FormGroup>
                <label htmlFor="title">{'Two Weeks - Review Text'}</label>
                <TextArea
                    name="title"
                    value={values.td.title}
                    placeholder="Two Weeks Review Text"
                    onChange={handleChange}
                    style={{ width: '100%', height: '4rem' }}
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="title">{'Two Weeks - Review Question'}</label>
                <TextArea
                    name="title"
                    value={values.td.title}
                    placeholder="Two Weeks Review Text"
                    onChange={handleChange}
                    style={{ width: '100%', height: '4rem' }}
                />
            </FormGroup>
            <QuestionsSection>
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
            </QuestionsSection>
            {/* ROCKET QUESTION SECTION 3*/}
            <FormGroup>
                <label htmlFor="title">{'Two Months - Review Text'}</label>
                <TextArea
                    name="title"
                    value={values.td.title}
                    placeholder="Two Months Review Text"
                    onChange={handleChange}
                    style={{ width: '100%', height: '4rem' }}
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor="title">{'Two Months - Review Question'}</label>
                <TextArea
                    name="title"
                    value={values.td.title}
                    placeholder="Two Months Review Text"
                    onChange={handleChange}
                    style={{ width: '100%', height: '4rem' }}
                />
            </FormGroup>
            <QuestionsSection>
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
            </QuestionsSection>

            <button type="submit">submit</button>
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
