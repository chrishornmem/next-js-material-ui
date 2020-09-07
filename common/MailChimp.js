const logger = require('debug-level')('anycoop');

const request = require('request-promise');
const urlJoin = require('url-join');
const md5 = require('md5');

const API_VERSION = '3.0';

/**
 * @class MailChimp
 * @param {string} apiKey
 * @param {string} region
 * @param {string} audience
 */
function MailChimp(apiKey, region, audience) {
  if (!apiKey) throw 'Missing apiKey param';
  if (!audience) throw 'Missing audience param';
  if (!region) throw 'Missing region param';
  this.apiKey = apiKey;
  this.region = region;
  this.audience = audience;
  this.url = `https://anystring:${apiKey}@${region}.api.mailchimp.com/${API_VERSION}`;
}

/**
 * @param {string} email
 * @param {object} merge_fields
 */
MailChimp.prototype.addContact = async function (email, merge_fields) {
  logger.info('/MailChimp - addContact');
  logger.info(arguments);

  const url = urlJoin(this.url, `/lists/${this.audience}/members/`);

  logger.info(`hitting:${url}`);

  try {
    if (!email) throw 'Missing email';
    if (!merge_fields || typeof merge_fields !== 'object') {
      throw 'Missing or invalid merge_fields';
    }
    const result = await request({
      url,
      method: 'POST',
      json: true,
      body: {
        email_address: email,
        status: 'subscribed',
        merge_fields,
      },
    });
    logger.info('result:');
    logger.info(result);
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

/**
 * @param {string} email
 * @param {object} merge_fields
 */
MailChimp.prototype.updateContact = async function (email, merge_fields) {
  logger.info('/MailChimp - updateContact');
  logger.info(arguments);

  try {
    const url = urlJoin(this.url, `/lists/${this.audience}/members/${md5(email)}`);
    logger.info(`hitting:${url}`);

    if (!email) throw 'Missing email';
    if (!merge_fields || typeof merge_fields !== 'object') {
      throw 'Missing or invalid merge_fields';
    }
    const result = await request({
      url,
      method: 'PATCH',
      json: true,
      body: {
        merge_fields,
      },
    });
    logger.info('result:');
    logger.info(result);
    return result;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

/**
 * @param {object} tagName
 */
MailChimp.prototype.getSegmentId = async function (tagName) {
  logger.info('/MailChimp - getSegmentId');
  // logger.info(arguments);

  if (!tagName) throw Error('Missing tagName param');

  const tag = tagName.toLowerCase();

  logger.info("url:"+this.url);

  const url = urlJoin(this.url, `/lists/${this.audience}/segments/`);

  try {
    const result = await request({
      url,
      method: 'GET',
      json: true,
    });
    logger.info('result from /segments/');
    logger.info(result);

    const segment = result.segments.filter((s) => s.name.toLowerCase() === tag);
    logger.info("segment:");
    logger.info(segment);
    if (segment && segment[0]) return segment[0].id;
    logger.info('returning false');
    return false;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

/**
 * @param {string} email
 * @param {object} tagName
 * @param {string} defaultTag if tagName not found
 */
MailChimp.prototype.addTagToContact = async function (email, tagName, defaultTag) {
  logger.info('/addTagToContact - changed');
  logger.info(arguments);

  if (!email) throw 'Missing email param';
  if (!tagName) throw 'Missing tagName param';

  // find the segment ID from the given tag name
  try {
    let segmentId = await this.getSegmentId(tagName);
    if (!segmentId) {
      segmentId = await this.getSegmentId(defaultTag);
    }

    logger.info('segmentId:');
    logger.info(segmentId);

    const url = urlJoin(this.url, `/lists/${this.audience}/segments/${segmentId}/members`);

    const result = await request({
      url,
      method: 'POST',
      json: true,
      body: {
        email_address: email,
      },
    });

    logger.info('result:');
    logger.info(result);

    return result;
  } catch (error) {
    logger.info('caught error');
    logger.info(error);
    throw error;
  }
};

module.exports = {
  MailChimp,
};
