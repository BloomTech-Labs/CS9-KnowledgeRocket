export const Themes = {
    /* Component Spacing Main */
    grayBlueTheme: {
        padding: '7rem 1rem 1rem 12.2rem',

        /* Colors and Styles */
        header: '#324151',
        background: '#eeeeee',
        border: '#d1d1d1',
        primary: '#3f51b5',
        secondary: '#f50057',
        nav: '#324151',
        border_light: ' #74a752',
        highlight: '#dcfdc6',
        shadow:
            '0px 1px 3px 0px rgba(15, 12, 12, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
    },

    navyBlueTheme: {
        padding: '7rem 1rem 1rem 12.2rem',

        /* Colors and Styles */
        header: '#324151',
        background: '#A0B7CE',
        border: '#d1d1d1',
        primary: '#3f51b5',
        secondary: '#f50057',
        nav: '#324151',
        border_light: ' #74a752',
        highlight: '#dcfdc6',
        shadow:
            '0px 1px 3px 0px rgba(15, 12, 12, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
    },
};

export const smallBreakPoint = css => `
    @media (max-width: 540px) {
        ${css}
    }
`;
