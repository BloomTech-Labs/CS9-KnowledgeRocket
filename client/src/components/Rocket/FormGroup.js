import React from 'react';
import Styled from 'styled-components';

export const FormGroup = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;
export const Blurb = Styled.p`
    margin: 1rem 0;
    text-align: justify;
`;
export const TextArea = Blurb.extend``.withComponent('textarea');

export const QuestionWrapper = Styled.div`
    display: grid;
    margin: 0 0 1rem 0;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    width: 100%;
`;

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
 * @param {string} props.increment
 */
export const QuestionChoices = ({ handleBlur, handleChange, values, increment, errors }) => {
    return (
        <section>
            <FormGroup>
                <label htmlFor={`${increment}.explanation`}>{`${
                    verbageDictionary[increment]
                } - Review Text`}</label>
                <TextArea
                    name={`${increment}.explanation`}
                    value={values[increment].explanation}
                    placeholder="Two Day Review Text"
                    onChange={handleChange}
                    style={{ width: '100%', height: '4rem' }}
                />
            </FormGroup>
            <FormGroup>
                <label htmlFor={`${increment}.question`}>{`${
                    verbageDictionary[increment]
                } - Review Question`}</label>
                <TextArea
                    name={`${increment}.question`}
                    value={values[increment].question}
                    placeholder="Two Day Review Text"
                    onChange={handleChange}
                    style={{ width: '100%', height: '4rem' }}
                />
            </FormGroup>
            <QuestionWrapper>
                <label>
                    <input
                        name={`${increment}.correct`}
                        checked={values[increment].choices[0].text === values[increment].correct}
                        value={values[increment].choices[0].text}
                        type="radio"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <input
                        name={`${increment}.choices[0].text`}
                        type="text"
                        onChange={handleChange}
                        value={values[increment].choices[0].text}
                    />
                </label>
                <label>
                    <input
                        name={`${increment}.correct`}
                        checked={values[increment].choices[1].text === values[increment].correct}
                        value={values[increment].choices[1].text}
                        type="radio"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <input
                        name={`${increment}.choices[1].text`}
                        type="text"
                        onChange={handleChange}
                        value={values[increment].choices[1].text}
                    />
                </label>
                <label>
                    <input
                        name={`${increment}.correct`}
                        checked={values[increment].choices[2].text === values[increment].correct}
                        value={values[increment].choices[2].text}
                        type="radio"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <input
                        name={`${increment}.choices[2].text`}
                        type="text"
                        onChange={handleChange}
                        value={values[increment].choices[2].text}
                    />
                </label>
                <label>
                    <input
                        name={`${increment}.correct`}
                        checked={values[increment].choices[3].text === values[increment].correct}
                        value={values[increment].choices[3].text}
                        type="radio"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <input
                        name={`${increment}.choices[3].text`}
                        type="text"
                        onChange={handleChange}
                        value={values[increment].choices[3].text}
                    />
                </label>
            </QuestionWrapper>
        </section>
    );
};
