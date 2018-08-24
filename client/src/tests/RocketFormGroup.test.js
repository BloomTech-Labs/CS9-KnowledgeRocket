import React from 'react';
import renderer from 'react-test-renderer';
import { renderSnapshotTest } from './utils';
import 'jest-styled-components';
// Component
import {
    Blurb,
    ErrorText,
    FormGroup,
    QuestionChoices,
    QuestionWrapper,
    TextArea,
    errorHelper,
} from '../components/Rocket/FormGroup';

const Grouplets = {
    Blurb,
    ErrorText,
    FormGroup,
    QuestionWrapper,
    TextArea,
};

describe('RocketFormGroup', () => {
    describe('testing styled components', () => {
        describe('render', () => {
            for (const key in Grouplets) {
                if (Grouplets.hasOwnProperty(key)) {
                    const Grouplet = Grouplets[key];
                    describe(`<${key} />`, () => {
                        renderSnapshotTest(Grouplet);
                    });
                }
            }
        });
    });
});
