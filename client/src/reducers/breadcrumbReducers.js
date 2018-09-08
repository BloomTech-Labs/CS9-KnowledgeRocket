import { UPDATE_BREADCRUMBS } from '../actions';

const defaultState = {
    // Initialize Breadcrumb Redux State/Store Portion Here
    paths: ['/'],
    labels: ['Home'],
};

export default (state = defaultState, action) => {
    let StateCopy = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case UPDATE_BREADCRUMBS:
            let path = action.payload;
            const crumbs = path.split('/');
            const currentLabels = [...defaultState.labels];
            const currentPaths = [...defaultState.paths];
            crumbs.forEach(item => {
                // Uppercase first letter of each item before adding them to the breadcrumbs path.
                if (item !== '') {
                    const label = item.charAt(0).toUpperCase() + item.slice(1) + '';
                    currentLabels.push(label);
                }
            });
            // Generate The BreadCrumbs Path from action.payload
            // Excluding the very last path, because it will be the current location.
            for (let i = 0; i < crumbs.length - 1; i++) {
                if (crumbs[i] !== '') currentPaths.push('/' + crumbs[i]);
            }
            // Push the current location last into the currentPaths Array
            currentPaths.push(action.payload);
            StateCopy = { labels: currentLabels, paths: currentPaths };
            return StateCopy;
        default:
            return StateCopy;
    }
};
