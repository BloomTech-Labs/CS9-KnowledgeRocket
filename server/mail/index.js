const Router = require('./MailRouter');
const Model = require('./MailModel');

/**
 * Function that generates email.
 * @param {string[]} to All the recipients of this email
 * @param {string} from Email address that will be included in the From field
 * @param {*} replyTo Email address that will be included in the Reply field
 * @param {*} subject Text that will be included in the Subject field
 * @param {*} Text String depiction of email content that will be shown when html is disabled
 * @param {*} html Rendered HTML when email content allows for html
 * @param {string|null} [cc=null] If the property is not null, the email address that should be included in the CC. Defaults to `null`
 */
const generateEmail = (to, from, replyTo, subject, text, html, cc) => {
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

module.exports = { Router, Model, generateEmail };
