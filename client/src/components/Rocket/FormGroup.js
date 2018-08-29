import React from 'react';
import Styled from 'styled-components';

export const FormGroup = Styled.div`
    padding: 2rem 2rem 0 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;
export const TextArea = Styled.textarea`
    width: 100%;
    height: 4rem;
`;
export const Blurb = TextArea.extend`
    margin: 1rem 0;
    text-align: justify;
`.withComponent('p');

export const QuestionWrapper = Styled.div`
    display: grid;
    margin: 0 0 1rem 0;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    width: 100%;
`;

export const ErrorText = Styled.span`
    color: red;
    font-size: .8rem;
    height: 1rem;
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
                    />
                </label>
            </QuestionWrapper>
            <ErrorText id={a11yIdFor('correct')}>{displayError('correct')}</ErrorText>
        </section>
    );
};
export const generateErrorIdFrom = (attr, identifier = '') =>
    `${attr}-${identifier}-ErrorDescription`;
