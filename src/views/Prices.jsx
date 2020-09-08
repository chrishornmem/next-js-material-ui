import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, useTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

import clsx from 'clsx';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Breaker from '../Breaker';
import Typography from '../Typography';

const styles = (theme) => ({
  box: {
  //  backgroundColor: indigo['50'],
  },
  h2: {
   fontSize: '1.5rem',
   fontWeight: 300,
   lineHeight: 1.334,
  },
  hr: {
    width: '80%',
  },
  root: {
    //  color: theme.palette.secondary.main,
    padding: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(16),
      paddingRight: theme.spacing(16),
    },
  },
  content: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  feature: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    fontSize: '0.9em',
  },
  highlight: {
    backgroundColor: indigo['50'],
  },
});

function Prices(props) {
  const { classes, containerClassName } = props;
  const theme = useTheme();

  return (
    <>
      <div className={containerClassName}>
        <Container>
          <Box py={4}>
            <Typography align="center" variant="h1">Pricing Plans</Typography>
            <Typography align="center" variant="body1">All our plans come fully loaded with all the features of Anycoop.</Typography>
          </Box>
          <Box py={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Card elevation={4}>
                  <CardContent>
                    <Typography align="center" className={classes.h2} variant="h2">
                      Free
                      <hr className={classes.hr} />
                    </Typography>
                    <Typography align="center" variant="subtitle2">
                      Trials
                    </Typography>
                    <Typography className={classes.content} align="center" variant="body1">
                      Up to 20 members
                    </Typography>
                    <Typography className={classes.content} color="secondary" align="center" variant="body2">
                      FREE
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      Member management
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      Forums
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      News
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      Events
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      Groups
                      {' '}
                      {' & '}
                      {' '}
                      Messaging
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      Questionnaires / Polls / Surveys
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      Marketplace
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card elevation={4}>
                  <CardContent>
                    <Typography align="center" className={classes.h2} variant="h2">
                      Small
                      <hr className={classes.hr} />
                    </Typography>
                    <Typography align="center" variant="subtitle2">
                      Small co-operatives
                    </Typography>
                    <Typography className={classes.content} align="center" variant="body1">
                      Up to 1,000 members
                    </Typography>
                    <Typography className={classes.content} color="secondary" align="center" variant="body2">
                      $99 / month
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      Member management
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      Forums
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      News
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      Events
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      Groups
                      {' '}
                      {' & '}
                      {' '}
                      Messaging
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      Questionnaires / Polls / Surveys
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      Marketplace
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card className={classes.highlight} elevation={12}>
                  <CardContent>
                    <Typography align="center" className={classes.h2} variant="h2">
                      Medium
                      <hr className={classes.hr} />
                    </Typography>
                    <Typography align="center" variant="subtitle2">
                      Medium-sized co-operatives
                    </Typography>
                    <Typography className={classes.content} align="center" variant="body1">
                      Up to 5,000 members
                    </Typography>
                    <Typography className={classes.content} color="secondary" align="center" variant="body2">
                      $249 / month
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      Member management
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      Forums
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      News
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      Events
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      Groups
                      {' '}
                      {' & '}
                      {' '}
                      Messaging
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      Questionnaires / Polls / Surveys
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      Marketplace
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card elevation={4}>
                  <CardContent>
                    <Typography align="center" className={classes.h2} variant="h2">
                      Large
                      <hr className={classes.hr} />
                    </Typography>
                    <Typography align="center" variant="subtitle2">
                      Large co-operatives and enterprises
                    </Typography>
                    <Typography className={classes.content} align="center" variant="body1">
                      Up to 10,000 members
                    </Typography>
                    <Typography className={classes.content} color="secondary" align="center" variant="body2">
                      $500 / month
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      Member management
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      Forums
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      News
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      Events
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      Groups
                      {' '}
                      {' & '}
                      {' '}
                      Messaging
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      Questionnaires / Polls / Surveys
                    </Typography>
                    <Typography className={classes.feature} align="center" variant="body1">
                      Marketplace
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              {/* <Button variant="contained" color="primary" component={Link} naked href="/">
	          Go to the main page
	        </Button> */}
            </Grid>
          </Box>
        </Container>
      </div>
      <Box className={classes.box}>
        <Breaker variant="type2" color={theme.palette.primary.light} />
      </Box>
    </>
  );
}

Prices.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Prices);
