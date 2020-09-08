// Render Prop
import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import PhoneIcon from '@material-ui/icons/Phone';
import LanguageIcon from '@material-ui/icons/Language';
import EmailIcon from '@material-ui/icons/MailOutline';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { joinWords } from './utils';
import Typography from './Typography';
import Button from './Button';
import { join } from 'path';

const styles = (theme) => ({
  address: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textTransform: 'capitalize',
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    height: 52,
  },
  coopContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    borderTop: 'solid 1px #e0e0e0',
    borderBottom: 'solid 1px #e0e0e0',
  },
  coopName: {
    fontSize: '2rem',
    fontFamily: theme.typography.fontFamily,
    textTransform: 'capitalize',
    // marginBottom: theme.spacing(4),
    // marginTop: theme.spacing(4),
    // [theme.breakpoints.up('sm')]: {
    //   marginTop: theme.spacing(20),
    // },
  },
  description: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontSize: '1.2rem',
  },
  iconList: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.2rem',
  },
  img: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  link: {
    fontSize: '1rem',
    backgroundColor: 'transparent',
  },
  phone: {
    fontSize: 'inherit',
    marginLeft: theme.spacing(1),
  },
  playerWrapper: {
    position: 'relative',
    paddingTop: '56.25%', /* 720 / 1280 = 0.5625 */
  },
  reactPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  search: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '66%',
  },
  socialButton: {
    marginTop: -theme.spacing(2),
  },
});

const CoopDetails = React.forwardRef((props, ref) => {
  const {
    coop = {},
    classes,
    className,
    style,
    emailSubject,
    ...other
  } = props;

  const email = coop?.email ? `mailto:${coop.email}?subject=${emailSubject || 'Anycoop website%20contact'}` : null;

  function makeAddress(coop) {
    if (!coop) return '';
    const { address, city, state, postCode, country } = coop;
    return joinWords(', ', address, city, state, postCode, country);
  }

  return (
    <>
      <Typography variant="h1" className={classes.coopName}>
        {coop.name}
        {coop.facebookUrl ? (
          <IconButton
            className={classes.socialButton}
            href={coop.facebookUrl}
            aria-label="facebook"
            edge="end"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon fontSize="inherit" color="secondary" />
          </IconButton>
        ) : null }
        {coop.linkedInUrl ? (
          <IconButton
            className={classes.socialButton}
            href={coop.linkedInUrl}
            aria-label="linkedIn"
            edge="end"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon fontSize="inherit" color="secondary" />
          </IconButton>
        ) : null }
      </Typography>
      <Typography variant="subtitle2" className={classes.address}>{makeAddress(coop)}</Typography>
      <Typography variant="body1" className={classes.description}>{coop.description}</Typography>
      {coop.telephone ? (
        <div className={classes.iconList}>
          <PhoneIcon fontSize="inherit" color="primary" />
          <Typography variant="body1" className={classes.phone}>{coop.telephone}</Typography>
        </div>
      ) : null }
      {coop.webUrl ? (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<LanguageIcon />}
          href={coop.webUrl}
          target="_blank"
          rel="noopener noreferrer"
          classes={{
            root: classes.button,
          }}
          style={{ marginRight: 16 }}
          disabled={false}
        >
          Website
        </Button>
      ): null }
      {coop.email ? (
        <Button
          variant="contained"
          color="secondary"
          href={email}
          startIcon={<EmailIcon />}
          classes={{
            root: classes.button,
          }}
          disabled={false}
        >
          Email
        </Button>
      ) : null }
    </>
  );
});

export default withStyles(styles, { name: 'CoopDetails' })(CoopDetails);
