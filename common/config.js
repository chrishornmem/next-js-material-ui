module.exports = {
  googleRecaptchaSecretKey: process.env.GOOGLE_RECAPTCHA_SECRETKEY,
  mailChimpAudienceId: process.env.MAILCHIMP_AUDIENCE_ID || 'dc6294cc3f',
  mailChimpRegion: process.env.MAILCHIMP_REGION || 'us10',
  mailChimpApiKey: process.env.MAILCHIMP_API_KEY,
  mailChimpSignUpTag: process.env.MAILCHIMP_SIGN_UP_TAG || 'WEBSITE',
  dbUri: process.env.MONGODB_URI,
};
