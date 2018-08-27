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
    generateErrorIdFrom,
} from '../components/Rocket/FormGroup';

// simple styled components
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
            for (const ComponentName in Grouplets) {
                if (Grouplets.hasOwnProperty(ComponentName)) {
                    const Grouplet = Grouplets[ComponentName];
                    describe(`<${ComponentName} />`, () => {
                        renderSnapshotTest(Grouplet);
                    });
                }
            }
        });
    });
    describe('<QuestionChoices />', () => {
        const mockProps = {
            values: {
                tm: {
                    explanation: '',
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
                },
            },

            interval: 'tm',

            errors: {
                tm: '',
            },

            touched: {},
        };
        renderSnapshotTest(QuestionChoices, mockProps);
        // TODO prop tests
    });

    describe('errorHelper', () => {
        it('displays correct error', () => {
            const mockError = {
                td: 'I errored',
            };
            const mockTouch = {
                td: true,
            };
            const mockProperty = 'td';

            const mockDisplayError = errorHelper(mockError, mockTouch);
            expect(mockDisplayError(mockProperty)).toBe(mockError.td);
        });
        it('does not return error when value is untouched', () => {
            const mockError = {
                td: 'I errored',
            };
            const mockTouch = {};
            const mockProperty = 'td';

            const mockDisplayError = errorHelper(mockError, mockTouch);
            expect(mockDisplayError(mockProperty)).toBe(undefined);
        });
    });
    describe('generateIdFrom', () => {
        it('correctly generates id', () => {
            const attr = 'td';
            const identifier = 'question';
            const expected = `${attr}-${identifier}-ErrorDescription`;
            expect(generateErrorIdFrom(attr, identifier)).toBe(expected);
        });
    });
});
