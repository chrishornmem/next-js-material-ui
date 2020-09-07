const request = require('request-promise');

/**
 * @class Captcha
 * @param {string} siteKey
 * @param {string} secretKey
 */
function Captcha(secretKey) {
  if (!secretKey) throw 'Missing secretKey param';

  this.secretKey = secretKey;
  this.url = 'https://www.google.com/recaptcha/api/siteverify';
}

/**
 * @param {string} response
 */
Captcha.prototype.verify = async function (response) {
  if (!response) throw 'Missing response param';
  return request.post({
    url: this.url,
    json: true,
    form: {
      secret: this.secretKey,
      response: response,
    },
  });
}

module.exports = {
  Captcha,
};
