import React from 'react';
import Styled from 'styled-components';

export const FormGroup = Styled.div`
    font-family: 'Roboto', serif;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    label {
        padding: .25rem;
        font-weight: bold;
        font-size: 1.3rem;
        margin-bottom: .5rem;
    }
    .requiredFields {
        color: red;
        margin-bottom: .5rem;
    }
    input[name="title"] {
        border: 0.5px solid #A9A9A9;
        width: 50%;
        min-height: 2rem;
        border-radius: 0.25rem;
        padding: .25rem;
    }
`;
export const TextArea = Styled.textarea`
    width: 100%;
    min-height: 4rem;
    border-radius: 0.25rem;
    padding: .25rem;
`;
export const Blurb = TextArea.extend`
    margin: 1rem 0;
    text-align: justify;
    font-size: 1.1rem;
`.withComponent('p');

export const QuestionWrapper = Styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    width: 100%;
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
    }
    input[type="text"]{
        border-radius: 0.25rem;
        border: 0.5px solid #A9A9A9;
        width: 91%;
        min-height: 2rem;
        padding: .25rem .5rem;
        margin: .25rem;
    }
    input[type="radio"] {
        padding: .25rem;
    }
`;

export const ErrorText = Styled.div`
    color: red;
    font-size: .8rem;
    height: 1rem;
    margin-bottom: 1rem;
`;

export const errorHelper = (error, touched) => property =>
    touched && touched[property] && error && error[property];

const verbageDictionary = {
    td: 'Two Days',
    tm: 'Two Months',
    tw: 'Two Weeks',
};

/**
 *
 * @param {object} props
 * @param {Function} props.handleBlur
 * @param {Function} props.handleChange
 * @param {object} props.values
 * @param {string} props.interval
 * @param {object} props.errors
 * @param {object} props.touched
 */
export const QuestionChoices = ({
    handleBlur,
    handleChange,
    values,
    interval,
    errors,
    touched,
}) => {
    const displayError = errorHelper(errors, touched);

    const a11yIdFor = label => generateErrorIdFrom(interval, label);
    return (
        <section>
            <FormGroup>
                <label htmlFor={`${interval}.explanation`}>{`${
                    verbageDictionary[interval]
                } - Review Text`}</label>
                <TextArea
                    name={`${interval}.explanation`}
                    value={values[interval].explanation}
                    placeholder="Two Day Review Text"
                    onChange={handleChange}
                    aria-describedby={a11yIdFor('explanation')}
                />
                <ErrorText id={a11yIdFor('explanation')}>{displayError('explanation')}</ErrorText>
            </FormGroup>
            <FormGroup>
                <label htmlFor={`${interval}.question`}>{`${
                    verbageDictionary[interval]
                } - Review Question`}</label>
                <TextArea
                    name={`${interval}.question`}
                    value={values[interval].question}
                    placeholder="Two Day Review Text"
                    onChange={handleChange}
                    aria-describedby={a11yIdFor('question')}
                />
                <ErrorText id={a11yIdFor('question')}>{displayError('question')}</ErrorText>
            </FormGroup>
            <QuestionWrapper>
                <label>
                    <input
                        name={`${interval}.correct`}
                        checked={values[interval].choices[0].text === values[interval].correct}
                        value={values[interval].choices[0].text}
                        type="radio"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-describedby={a11yIdFor('correct')}
                    />
                    <input
                        name={`${interval}.choices[0].text`}
                        type="text"
                        onChange={handleChange}
                        value={values[interval].choices[0].text}
                        placeholder={'Answer 1'}
                    />
                </label>
                <label>
                    <input
                        name={`${interval}.correct`}
                        checked={values[interval].choices[1].text === values[interval].correct}
                        value={values[interval].choices[1].text}
                        type="radio"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-describedby={a11yIdFor('correct')}
                    />
                    <input
                        name={`${interval}.choices[1].text`}
                        type="text"
                        onChange={handleChange}
                        value={values[interval].choices[1].text}
                        placeholder={'Answer 2'}
                    />
                </label>
                <label>
                    <input
                        name={`${interval}.correct`}
                        checked={values[interval].choices[2].text === values[interval].correct}
                        value={values[interval].choices[2].text}
                        type="radio"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-describedby={a11yIdFor('correct')}
                    />
                    <input
                        name={`${interval}.choices[2].text`}
                        type="text"
                        onChange={handleChange}
                        value={values[interval].choices[2].text}
                        placeholder={'Answer 3'}
                    />
                </label>
                <label>
                    <input
                        name={`${interval}.correct`}
                        checked={values[interval].choices[3].text === values[interval].correct}
                        value={values[interval].choices[3].text}
                        type="radio"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-describedby={a11yIdFor('correct')}
                    />
                    <input
                        name={`${interval}.choices[3].text`}
                        type="text"
                        onChange={handleChange}
                        value={values[interval].choices[3].text}
                        placeholder={'Answer 4'}
                    />
                </label>
            </QuestionWrapper>
            <ErrorText id={a11yIdFor('correct')}>{displayError('correct')}</ErrorText>
        </section>
    );
};
export const generateErrorIdFrom = (attr, identifier = '') =>
    `${attr}-${identifier}-ErrorDescription`;
