const sitemap = require('nextjs-sitemap-generator');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const sitemapFilename = 'sitemap.xml';
const baseUrl = 'https://anycoop.zone';

const files = fs.readdirSync('.next');
console.log(`.next directory files (${files.length})`);
files.forEach((file) => {
  console.log(file);
});
const BUILD_ID = fs.readFileSync(path.join(__dirname, '.next/BUILD_ID')).toString();
sitemap({
  baseUrl,
  pagesDirectory: path.join(__dirname, '.next/serverless/pages'),
  targetDirectory: 'public/',
  sitemapFilename,
  ignoredExtensions: ['js', 'map'],
  ignoredPaths: ['[fallback]'],
}).then(() => {
  if (process.env.NODE_ENV !== 'development') {
    console.log("pinging google to update sitemap");
    return axios.get(`http://www.google.com/ping?sitemap=${baseUrl}/${sitemapFilename}`);
  } else {
    console.log("skipping google ping");
  }
}).then(() => {
  console.log('Done');
}).catch((e) => {
  console.error(e);
});
