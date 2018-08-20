/**
 * Function that generates email.
 * @param {object} email
 * @param {string[]} email.to All the recipients of this email
 * @param {string} email.from Email address that will be included in the From field
 * @param {string} email.replyTo Email address that will be included in the Reply field
 * @param {string} email.subject Text that will be included in the Subject field
 * @param {string} email.Text String depiction of email content that will be shown when html is disabled
 * @param {string} email.html Rendered HTML when email content allows for html
 * @param {string|null} [email.cc=null] If the property is not null, the email address that should be included in the CC. Defaults to `null`
 */
const __generateEmail = ({ to, from, replyTo, subject, text, html, cc = null }) => {
    return {
        to,
        from,
        replyTo,
        subject,
        text,
        html,
        cc,
    };
};
const validate = (validatee, validator) => {
    return validator(validatee);
};
const generateEmailIfValid = emailGenerator => validator => emailProps => {
    const { isValid, errors } = validate(emailProps, validator);
    return isValid ? emailGenerator(emailProps) : { errors };
};
const generateEmail = generateEmailIfValid(__generateEmail)(_ => ({ isValid: true }));

module.exports = { generateEmail, validate };
