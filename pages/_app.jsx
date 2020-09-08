import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Router, useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { ThemeProvider } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import { GA_TRACKING_ID } from '../common/gtag';
import theme from '../src/theme';
import AppAppBar from '../src/views/AppAppBar';
import AppFooter from '../src/AppFooter';
import AppPrompt from '../src/AppPrompt';
//import * as gtag from '../common/gtag';

import '../src/styles.css';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  const router = useRouter();
  const isHomePage = router.pathname === '/' || router.pathname.includes('.html');
  const LoadScript = dynamic(
    () => import('../src/LoadScript'),
    { ssr: false },
  );

  const pageStyle = {
    //   minHeight: '80vh',
  };
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      console.log("removing jss-server-side")
      jssStyles.parentElement.removeChild(jssStyles);
    }

    const handleRouteChange = (url) => {
      window.scrollTo(0, 0);
      if (window.ga) {
        window.ga('send', 'pageview', url);
      }
    };

    Router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      window.Calendly = undefined;
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AppAppBar inverted={!isHomePage} />
        <div style={pageStyle}>
          <Component {...pageProps} />
        </div>
        <AppFooter />
        <AppPrompt />
      </ThemeProvider>
      <LoadScript
        onLoad={() => window.ONEmStart({ app_id: '5dbf0394988af1001f5b727e' }).render('body')}
        scriptId="onem"
        src="https://bot.onem.zone/bundle.js"
      />
      <LoadScript
        src="https://assets.calendly.com/assets/external/widget.js"
        scriptId="calendly"
        onLoad={() => window?.Calendly?.initBadgeWidget({
          url: 'https://calendly.com/anycoop/building-your-digital-community',
          text: 'Book a call',
          color: '#ffdc34',
          textColor: 'rgba(0, 0, 0, 0.87)',
          branding: true,
        })}
      />
      <LoadScript
        src="https://www.google-analytics.com/analytics.js"
        scriptId="google-analytics"
        onLoad={() => {
          window.ga = window.ga || function () { (ga.q = ga.q || []).push(arguments); };
          window.ga.l = +new Date();
          window.ga('create', GA_TRACKING_ID, 'auto');
          window.ga('send', 'pageview');
        }}
      />
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
