import { renderSnapshotTest } from './utils';
import 'jest-styled-components';
// Component
import RForm from '../components/Rocket/RocketForm';

describe('<RocketForm />', () => {
    renderSnapshotTest(RForm);
});
