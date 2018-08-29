const yup = require('yup');
// Validation

/**
 *
 * @param {*} validatee
 * @param {Function} validator
 * @returns {{isValid: Boolean, errors: Array | null}}
 */
const validate = (validatee, validator) => {
    return validator(validatee);
};

const validationSchema = yup.object().shape({
    to: yup.array(requiredEmail()).required(),
    from: requiredEmail(),
    replyTo: requiredEmail(),
    subject: requiredString(),
    text: requiredString(),
    html: requiredString(),
    cc: yup
        .string()
        .email()
        .notRequired()
        .nullable(),
});

/**
 *  Promise that resolves with an object containing whether or not the object
 *  being validated isValid, and errors if there are any.
 * @param {*} validatee Object that is being validated
 * @param {typeof validationSchema} schema Validation object that does the actual validation.
 */
const Validator = async (validatee, schema = validationSchema) => {
    try {
        await schema.validate(validatee);

        return { isValid: true, errors: null };
    } catch (error) {
        return {
            isValid: false,
            errors: error.errors,
        };
    }
};

// Generation

/**
 * Function that generates email.
 * @param {object} email
 * @param {string[]} email.to All the recipients of this email
 * @param {string} email.from Email address that will be included in the From field
 * @param {string} email.replyTo Email address that will be included in the Reply field
 * @param {string} email.subject Text that will be included in the Subject field
 * @param {string} email.text String depiction of email content that will be shown when html is disabled
 * @param {string} email.html Rendered HTML when email content allows for html
 * @param {string|null} [email.cc=null] If the property is not null, the email address that should be included in the CC. Defaults to `null`
 */
const __generateEmail = ({ to, from, replyTo, subject, text, html, cc = null }) => {
    return {
        to,
        from,
        replyTo,
        subject, // Knowledge Rocket: question title,
        text, // You have a new Rocket available. Follow this link to blast off https://webaddress/cohort/question/student
        html, // {text} <a href={link} />
        cc,
    };
};
/**
 *
 * @param {typeof __generateEmail} emailGenerator
 */
const generateEmailIfValid = emailGenerator =>
    /**
     * @param {typeof Validator} validator Promise that runs validation
     */
    validator =>
        /**
         * Promise that generates email when valid, and returns
         * errors array when invalid.
         * @param {object} emailProps
         * @param {string[]} emailProps.to All the recipients of this email
         * @param {string} emailProps.from Email address that will be included in the From field
         * @param {string} emailProps.replyTo Email address that will be included in the Reply field
         * @param {string} emailProps.subject Text that will be included in the Subject field
         * @param {string} emailProps.text String depiction of email content that will be shown when html is disabled
         * @param {string} emailProps.html Rendered HTML when email content allows for html
         * @param {string|null} [email.cc=null] If the property is not null, the email address that should be included in the CC. Defaults to `null`
         */
        async emailProps => {
            const { isValid, errors } = await validate(emailProps, validator);
            return isValid ? emailGenerator(emailProps) : { errors };
        };

/**
 * Promise that generates an email if valid email object, otherwise returns an object
 * with errors.
 */
const generateEmail = generateEmailIfValid(__generateEmail)(Validator);

module.exports = { generateEmail, validate, Validator };

// helpers
function requiredEmail() {
    return yup
        .string()
        .email()
        .trim()
        .required();
}

function requiredString() {
    return yup
        .string()
        .trim()
        .required();
}
