const logger = require('debug-level')('anycoop');
const config = require('../../common/config.js');
const { Captcha } = require('../../common/Captcha')

const captcha = new Captcha(
  config.googleRecaptchaSecretKey,
);

export default async (req, res) => {
  const {
    query,
    method,
    body,
  } = req;

  logger.info('/api/captcha');
  logger.info(req.body);

  switch (method) {
    case 'POST': {
      const response = await captcha.verify(body.response)
      logger.info('captcha response');
      logger.info(response);
      res.status(200).json({ success: response.success && response.score > 0.5});
      break;
    }
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
