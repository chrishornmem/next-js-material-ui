import React from 'react';
import Head from 'next/head';
import Box from '@material-ui/core/Box';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Breaker from '../src/Breaker';
import Typography from '../src/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '1.125rem',
  },
  h2: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textTransform: 'capitalize',
    fontSize: '1.5rem',
  },
  img: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    width: '100%',
  },
  subtitleWidth: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      width: '66%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
}));

export default function Features() {
  const classes = useStyles();

  const theme = useTheme();

  return (
    <>
      <Head>
        <title key="title">Anycoop - Features</title>
        <meta property="og:title" content="Anycoop - Features" />
        <meta key="description" name="description" content="An all-in-one membership management solution designed for co-operatives" />
        <meta key="metaDescription" property="og:description" content="An all-in-one membership management solution designed for co-operatives" />
      </Head>
      <Box p={4}>
        <Container>
          <Typography align="center" variant="h1">All features under one roof</Typography>
          <Typography className={classes.subtitleWidth} align="center" variant="body1">Anycoop brings together all the tools you need under one roof.  All features listed below are available on web widget, mobile app and SMS.</Typography>
          <Grid
            container
            justify="center"
            spacing={8}
            style={{ marginTop: 40 }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
            >
              <img className={classes.img} alt="news" src="/images/feature-news.png" />
              <Typography className={classes.h2} variant="h2">News</Typography>
              <Typography className={classes.root} variant="body1">
                Create and manage rich multimedia news articles.  Incorporate videos and images from popular social media sources.
                Members can like and comment on articles of interest.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
            >
              <img className={classes.img} alt="forums" src="/images/feature-forums.png" />
              <Typography className={classes.h2} variant="h2">Forums</Typography>
              <Typography className={classes.root} variant="body1">
                Create unlimited forums focused on different topics.  Members can participate by creating multimedia posts and adding comments.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
            >
              <img className={classes.img} alt="survey forms" src="/images/feature-survey.png" />
              <Typography className={classes.h2} variant="h2">Questionnaires</Typography>
              <Typography className={classes.root} variant="body1">
                Create multimedia custom surveys, loan applications, training modules, elections and polls. Broadcast questionnaires to all members or specific groups. Anycoop collects the results automatically and can export  CSV format.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justify="center"
            spacing={8}
            style={{ marginTop: 40 }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
            >
              <img className={classes.img} alt="calendar event" src="/images/feature-events.png" />
              <Typography className={classes.h2} variant="h2">Events</Typography>
              <Typography className={classes.root} variant="body1">
                Create multimedia events where members can confirm their attendance. Members can message the admin to enquire about the event.  Reminders are automtically sent to confirmed attendees.  Updates are sent to members when any changes are made.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
            >
              <img className={classes.img} alt="messages" src="/images/feature-messaging.png" />
              <Typography className={classes.h2} variant="h2">
                Groups
                { ' & ' }
                {' '}
                Messaging
              </Typography>
              <Typography className={classes.root} variant="body1">
                Members can send private messages to each other.  Admins can send broadcast messages to all members or to specific groups.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
            >
              <img className={classes.img} alt="market place items" src="/images/feature-marketplace.png" />
              <Typography className={classes.h2} variant="h2">Marketplace</Typography>
              <Typography className={classes.root} variant="body1">
                Members can list items for sale using rich multimedia advertisements.  Members can bid, barter or buy as well as create
                {' '}
                "wanted"
                {' '}
                listings.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justify="center"
            spacing={8}
            style={{ marginTop: 40 }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
            >
              <img className={classes.img} alt="frequently asked questions" src="/images/feature-faq.png" />
              <Typography className={classes.h2} variant="h2">FAQs</Typography>
              <Typography className={classes.root} variant="body1">
                Create rich multimedia FAQs and cascade information to your members with ease.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
            >
              <img className={classes.img} alt="managing members" src="/images/feature-management.png" />
              <Typography className={classes.h2} variant="h2">Member Management</Typography>
              <Typography className={classes.root} variant="body1">
                Easily invite new members via automated emails.  Manage user profiles and groups.  Manage your member directory and admins.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
            >
              <img className={classes.img} alt="learning" src="/images/feature-training.png" />
              <Typography className={classes.h2} variant="h2">Training</Typography>
              <Typography className={classes.root} variant="body1">
                Include rich multimedia content in your training programmes.  Admins can assign points to questions and participants are ranked according to their score.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box>
        <Breaker variant="type2" color={theme.palette.primary.light} />
      </Box>
    </>
  );
}
