import React from 'react';
import Styled from 'styled-components';

export const FormGroup = Styled.div`
    font-family: 'Roboto', serif;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
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
        border: 1px solid #8BB8D488 !important;
        width: 50%;
        min-height: 2rem;
        padding: 0.5rem;
        background-color: #f2f7ff;
        border-radius: 0.25rem;
        @media (max-width: 600px) {
            width: 100%;
        }
    }
    .mainTitle {
        width: 100%;
    }
`;
export const TextArea = Styled.textarea`
    width: 100%;
    min-height: 4rem;
    padding: .5rem;
    background-color: #f2f7ff;
    border-radius: 0.25rem;
    border: 1px solid #8BB8D488 !important;
`;

export const Blurb = Styled(TextArea)`
    margin: 1rem 0;
    text-align: justify;
    font-size: 1.1rem;
`.withComponent('p');

export const QuestionWrapper = Styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    @media (max-width: 600px) {
        flex-direction: column;
    }
    label {
        width: 45%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        margin: 0.25rem 0;
        @media (max-width: 600px) {
            width: 100%;
        }
    }
    input[type="text"]{
        flex-grow: 3;
        border: 1px solid #8BB8D488 !important;
        min-height: 2rem;
        padding: 0.5rem;
        background-color: #f2f7ff;
        border-radius: 0.25rem;
    }
    input[type="radio"] {
        flex-grow: 0;
        padding: .25rem;
        margin:  0 .5rem;
    }
`;//border: 0.5px solid #A9A9A9;

export const ErrorText = Styled.div`
    display: flex;
    justify-content: ${props => (props.left ? 'flex-start' : 'center')};
    align-items: center;
    color: red;
    font-size: .8rem;
    margin: 0.35rem 0 0 0;
    width: 100%;
`;

export const StyledSection = Styled.section`
    padding: 1rem;
    background-color: #fff;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    box-shadow: 0px 1px 3px 0px rgba(15, 12, 12, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
        0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`

export const errorHelper = (error, touched) => property =>
    touched && touched[property] && error && error[property];

const verbageDictionary = {
    td: 'Two Days',
    tm: 'Two Months',
    tw: 'Two Weeks',
};

/**
 * @callback handleBlur
 * @param {*} event
 */

/**
 * @callback handleChange
 * @param {*} event
 */

/**
 *
 * @param {object} props
 * @param {handleBlur} props.handleBlur
 * @param {handleChange} props.handleChange
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
    const displayCorrectChoiceErrorAtIndex = i => displayCorrectChoiceError(errors, touched, i);
    return (
        <StyledSection>
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
                <ErrorText left id={a11yIdFor('explanation')}>
                    {displayError('explanation')}
                </ErrorText>
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
                <ErrorText left id={a11yIdFor('question')}>
                    {displayError('question')}
                </ErrorText>
            </FormGroup>
            <QuestionWrapper>
                <label>
                    <input
                        name={`${interval}.correct`}
                        checked={0 === Number(values[interval].correct)}
                        value={0}
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
                    <ErrorText id={a11yIdFor(`choices[0].text`)}>
                        {displayCorrectChoiceErrorAtIndex(0)}
                    </ErrorText>
                </label>
                <label>
                    <input
                        name={`${interval}.correct`}
                        checked={1 === Number(values[interval].correct)}
                        value={1}
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
                    <ErrorText id={a11yIdFor(`choices[1].text`)}>
                        {displayCorrectChoiceErrorAtIndex(1)}
                    </ErrorText>
                </label>
                <label>
                    <input
                        name={`${interval}.correct`}
                        checked={2 === Number(values[interval].correct)}
                        value={2}
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
                    <ErrorText id={a11yIdFor(`choices[2].text`)}>
                        {displayCorrectChoiceErrorAtIndex(2)}
                    </ErrorText>
                </label>
                <label>
                    <input
                        name={`${interval}.correct`}
                        checked={3 === Number(values[interval].correct)}
                        value={3}
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
                    <ErrorText id={a11yIdFor(`choices[3].text`)}>
                        {displayCorrectChoiceErrorAtIndex(3)}
                    </ErrorText>
                </label>
            </QuestionWrapper>
            <ErrorText id={a11yIdFor('correct')}>{displayError('correct')}</ErrorText>
        </StyledSection>
    );
};

const displayCorrectChoiceError = (error, touched, index) =>
    touched &&
    touched.choices &&
    touched.choices[index] &&
    touched.choices[index].text &&
    error &&
    error.choices &&
    error.choices[index] &&
    error.choices[index].text;

export const generateErrorIdFrom = (attr, identifier = '') =>
    `${attr}-${identifier}-ErrorDescription`;
