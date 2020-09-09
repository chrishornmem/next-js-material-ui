import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '../src/theme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <meta name="author" content="ONEm Communications Ltd" />
          <meta property="og:url" content="https://anycoop.zone" />
          <meta property="og:image" content="https://anycoop.zone/images/anycoop-logo-large.png" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Anycoop Logo" />
          <meta property="og:type" content="website" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta name="msapplication-TileImage" content="/mstile-150x150.png" />
          <link rel="dns-prefetch" href="https://anycoop.herokuapp.com" />
          <link rel="dns-prefetch" href="https://www.google-analytics.com" />
          <link rel="preload" as="script" href="https://bot.onem.zone/bundle.js" />
          <link rel="preload" as="script" href="https://assets.calendly.com/assets/external/widget.js" />
          <link 
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Roboto:wght@300;400;500;700&display=swap"
            rel="preload"
            as="style"
          />
          <link 
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Roboto:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
          <link 
            href="https://assets.calendly.com/assets/external/widget.css"
            rel="preload"
            as="style"
          />
          <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="192x192"  href="/android-chrome-192x192.png" />
          <link rel="icon" type="image/png" sizes="256x256"  href="/android-chrome-256x256.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="mask-icon" href="safari-pinned-tab.svg" color={theme.palette.primary.main} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};

