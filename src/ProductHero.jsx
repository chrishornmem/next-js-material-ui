import React from 'react';
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

import Typography from './Typography';
import ProductHeroLayout from './ProductHeroLayout';
import Search from './Search';

const useStyles = makeStyles((theme) => ({
  background: {
    //   backgroundImage: `url(${backgroundImage})`,
    backgroundColor: theme.palette.primary.main,
    //  backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
    //	color: theme.palette.common.white,
  },
  h1: {
    fontSize: '2.4rem',
    lineHeight: 1.3,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(16),
      marginBottom: theme.spacing(8),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '2rem',
    },
    [theme.breakpoints.up('xs')]: {
      width: '75%',
    },
  },
  highlight: {
    color: theme.palette.primary.main,
    backgroundColor: indigo['50'],
    padding: '6px 8px',
    borderRadius: 10,
    fontFamily: theme.typography.fontFamilySecondary,
  },
  h2: {
    fontSize: '2rem',
    fontWeight: theme.typography.fontWeightLight,
    color: theme.palette.common.white,
    marginBottom: theme.spacing(8),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(10),
    },
  },
  more: {
    marginTop: theme.spacing(2),
  },
  search: {
    width: '66%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
    },
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(12),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(18),
    },
  },
}));

function ProductHero(props) {

  const classes = useStyles();
  const router = useRouter();

  const handleSearch = ({ pathname, query }) => {
    router.push({ pathname, query });
  };

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      <Typography align="center" variant="h1" className={classes.h1}>
        <span className={classes.highlight}>Anycoop</span> the place where co-operatives discover, engage and trade
      </Typography>
      <Search className={classes.search} handleSubmit={handleSearch} />
      {/* <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        href="/premium-themes/onepirate/sign-up/"
      >
        Register
      </Button> */}
      {/* <Typography variant="body2" color="inherit" className={classes.more}>
        Discover the experience
      </Typography> */}
    </ProductHeroLayout>
  );
}

export default ProductHero;
