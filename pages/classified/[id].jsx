import React from 'react';
import Head from 'next/head';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

import ReactPlayer from 'react-player';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { formatCurrency, isVideoUrl, joinWords } from '../../src/utils';
import { connect, ObjectId } from '../../src/utils/db';
import Link from '../../src/Link';
import Search from '../../src/Search';
import Breadcrumbs from '../../src/Breadcrumbs';
import Typography from '../../src/Typography';
import CoopDetails from '../../src/CoopDetails';

const useStyles = makeStyles((theme) => ({
  about: {
    fontSize: '1rem',
    fontWeight: theme.typography.fontWeightLight,
    marginBottom: theme.spacing(2),
  },
  classifiedContainer: {
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
  container: {
    minHeight: '85vh',
  },
  description: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontSize: '1.2rem',
  },
  img: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  location: {
    color: theme.palette.text.secondary,
    textTransform: 'capitalize',
  },
  link: {
    fontSize: '1rem',
    backgroundColor: 'transparent',
  },
  playerWrapper: {
    position: 'relative',
    paddingTop: '56.25%', /* 720 / 1280 = 0.5625 */
  },
  price: {
    marginTop: theme.spacing(2),
    fontSize: '1.5rem',
    fontWeight: theme.typography.fontWeightRegular,
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
  seller: {
    backgroundColor: indigo['50'],
    padding: theme.spacing(2),
  },
  title: {
    fontSize: '2rem',
    fontFamily: theme.typography.fontFamily,
    textTransform: 'capitalize',
  },
}));

export default function Classified(props) {
  const classes = useStyles();
  const router = useRouter();

  const classified = props.classified || {};
  const keywords = router?.query?.keywords || props.keywords;
  const back = `/coops?keywords=${keywords}&view=${router?.query?.view || 'directory'}`;
  const title = `Anycoop Marketplace - ${classified?.title}`;
  const description = `Find ${classified?.title} on Anycoop marketplace.`;

  function makeLocation(coop) {
    if (!coop) return '';
    const { city, state, country } = coop;
    return joinWords(', ', city, state, country);
  }

  const handleSearch = ({ pathname, query }) => {
    router.push({ pathname, query });
  };

  if (!props.classified) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta key="title" property="og:title" content={title} />
        <meta key="description" name="description" content={description} />
        <meta key="metaDescription" property="og:description" content={description} />
      </Head>
      <Container className={classes.container}>
        <Search
          className={classes.search}
          initialValue={keywords || classified?.title}
          handleSubmit={handleSearch}
        />
        {/* <span onClick={() => router.back()}>Click here to go back</span> */}
        <Breadcrumbs>
          <Link color="inherit" href="/">
            <Typography className={classes.link}>Home</Typography>
          </Link>
          {keywords
            && (
            <Link color="inherit" href={back}>
              <Typography className={classes.link}>{keywords}</Typography>
            </Link>
            )}
          <Typography className={classes.link} color="textPrimary">{classified?.title}</Typography>
        </Breadcrumbs>
        <div className={classes.classifiedContainer}>
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              xs={12}
              sm={6}
            >
              <Typography variant="h1" className={classes.title}>
                {classified.title}
              </Typography>
              <Typography variant="subtitle2" className={classes.location}>{makeLocation(classified._coop)}</Typography>
              <Typography variant="subtitle2" className={classes.price}>
                {classified?._coop?.currency ? `${classified._coop.currency} ${formatCurrency(classified.price)}` : '' }
              </Typography>
              <Typography variant="body1" className={classes.description}>{classified.description}</Typography>
              <div className={classes.seller}>
                <Typography variant="body1" className={classes.about}>
                  About the seller
                </Typography>
                <CoopDetails emailSubject={`About ${classified.title} on Anycoop marketplace`} coop={classified._coop} />
              </div>
            </Grid>
            {classified.media && isVideoUrl(classified.media) ? (
              <Grid
                item
                xs={12}
                sm={6}
              >
                <div className={classes.playerWrapper}>
                  <ReactPlayer
                    className={classes.reactPlayer}
                    controls
                    url={classified.media}
                    title={classified.title}
                    width="100%"
                    height="100%"
                  />
                </div>
              </Grid>
            ) : null}
            {classified.media && !isVideoUrl(classified.media) ? (
              <Grid
                item
                xs={12}
                sm={6}
              >
                <img alt="Marketplace item" className={classes.img} src={classified.media} />
              </Grid>
            ) : null}
          </Grid>
        </div>
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  const { isConnected, Classifieds } = await connect();

  const paths = [];

  try {
    if (!isConnected) {
      throw new Error('db not connected');
    }
    const classifieds = await Classifieds.find({
      status: 'Open',
      type: 'For Sale',
    })
      .populate('_coop')
      .limit(1000);

    classifieds.forEach((classified) => {
      paths.push({ params: { id: classified.id } });
    });
    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.error(error);
  }

  return {
    paths: [
      { params: { id: '' } },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  let classified = null;
  try {
    const { activities, isConnected, Classifieds } = await connect();
    if (!ObjectId.isValid(params.id)) {
      return {
        props: { classified },
      };
    }

    if (!isConnected) {
      throw new Error('db not connected');
    }

    classified = await Classifieds.findOne({
      _id: ObjectId(params.id),
    })
      .populate('_coop')
      .lean();

    const keywords = classified?._coop?.activity || 'Other';

    classified = JSON.parse(JSON.stringify(classified)); //  needed to prevent JSON serialization error

    return {
      revalidate: 1,
      props: { classified, keywords, activities },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { classified },
    };
  }
}
