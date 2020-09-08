const logger = require('debug-level')('anycoop');
const request = require('request-promise');
const config = require('../../common/config.js');
const { MailChimp } = require('../../common/MailChimp');
const { Captcha } = require('../../common/Captcha');

const captcha = new Captcha(
  config.googleRecaptchaSecretKey,
);

const mailChimp = new MailChimp(
  config.mailChimpApiKey,
  config.mailChimpRegion,
  config.mailChimpAudienceId,
);

export default async (req, res) => {
  const {
    query,
    method,
    body,
  } = req;

  logger.info('/api/subscribe');
  logger.info(req.body);

  switch (method) {
    case 'POST': {
      try {
        const response = await captcha.verify(body.recaptchaResponse);
        logger.info('response:');
        logger.info(response);
        if (response.success && response.score > 0.5) {
          try {
            await mailChimp.addContact(body.email, {
              FNAME: body.firstName,
              LNAME: body.lastName,
            });
            await mailChimp.addTagToContact(body.email, config.mailChimpSignUpTag, config.mailChimpSignUpTag);
            return res.status(200).json({ success: true });
          } catch (error) {
            logger.error('ignoring error, continue');
            await mailChimp.addTagToContact(body.email, config.mailChimpSignUpTag, config.mailChimpSignUpTag);
            return res.status(200).json({ success: true });
          }
        } else {
          logger.error('recaptcha failed');
          res.status(403).json({ success: false });
        }
      } catch (error) {
        logger.error('recaptcha failed');
        logger.error(error);
        res.status(403).json({ success: false });
      }
      break;
    }
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
