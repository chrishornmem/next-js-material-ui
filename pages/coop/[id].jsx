import React from 'react';
import Head from 'next/head';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

import ReactPlayer from 'react-player';
import dynamic from 'next/dynamic';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { isVideoUrl } from '../../src/utils';
import { connect, ObjectId } from '../../src/utils/db';
import Link from '../../src/Link';
import Search from '../../src/Search';
import Breadcrumbs from '../../src/Breadcrumbs';
import Typography from '../../src/Typography';
import CoopDetails from '../../src/CoopDetails';
import MarketCard from '../../src/MarketCard';

const CustomMap = dynamic(
  () => import('../../src/CustomMap'),
  { ssr: false },
);

const useStyles = makeStyles((theme) => ({
  classifieds: {
    flexGrow: 1,
    backgroundColor: indigo['50'],
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(4),
    paddingTop: theme.spacing(6),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
  },
  container: {
    minHeight: '85vh',
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
  forSale: {
    fontSize: '1rem',
    fontWeight: theme.typography.fontWeightLight,
    marginBottom: theme.spacing(2),
  },
  img: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  link: {
    fontSize: '1rem',
    backgroundColor: 'transparent',
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
}));

export default function Coop(props) {
  const classes = useStyles();
  const router = useRouter();

  const coop = props.coop;
  const classifieds = props.classifieds || [];
  const keywords = router?.query?.keywords || props.keywords;

  const back = `/coops?keywords=${keywords}`;

  const title = `Anycoop - ${coop?.name} | ${coop?.activity}`;
  const description = `Find ${coop?.name} in sector '${coop?.activity}'. Get contact details, videos, photos and map directions.`;

  const handleMarketView = (event, market) => {
    router.push(
      {
        pathname: '/classified/[id]',
        query: { keywords },
      },
      `/classified/${market._id}`,
    );
  };

  const handleSearch = ({ pathname, query }) => {
    router.push({ pathname, query });
  };

  if (!coop) {
    return <Error statusCode={404} />;
  }

  coop.activity = coop.activity || 'Other';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta key="title" property="og:title" content={title} />
        <meta key="description" name="description" content={description} />
        <meta key="metaDescription" property="og:description" content={description} />
        <link
          rel="preload"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossOrigin=""
          as="style"
        />
        <link
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossOrigin=""
          rel="stylesheet"
        />
      </Head>
      <Container className={classes.container}>
        <Search 
          className={classes.search}
          initialValue={keywords || coop?.activity}
          handleSubmit={handleSearch}
        />
        {/* <span onClick={() => router.back()}>Click here to go back</span> */}
        <Breadcrumbs>
          <Link color="inherit" href="/">
            <Typography className={classes.link}>Home</Typography>
          </Link>
          {keywords
            ? (
              <Link color="inherit" href={back}>
                <Typography className={classes.link}>{keywords}</Typography>
              </Link>
            ) : (
              <Link color="inherit" href={back}>
                <Typography className={classes.link}>{coop.activity}</Typography>
              </Link>
            )}
          <Typography className={classes.link} color="textPrimary">{coop.name}</Typography>
        </Breadcrumbs>
        <div className={classes.coopContainer}>
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              xs={12}
              sm={6}
            >
              <CoopDetails coop={coop} />
            </Grid>
            {coop.loc && coop.loc.coordinates && (
              <Grid
                item
                xs={12}
                sm={6}
              >
                <CustomMap long={coop.loc.coordinates[0]} lat={coop.loc.coordinates[1]} />
              </Grid>
            )}
            {coop.banner && isVideoUrl(coop.banner) ? (
              <Grid
                item
                xs={12}
                sm={6}
              >
                <div className={classes.playerWrapper}>
                  <ReactPlayer
                    className={classes.reactPlayer}
                    controls
                    url={coop.banner}
                    title={coop.name}
                    width="100%"
                    height="100%"
                  />
                </div>
              </Grid>
            ) : null}
            {coop.banner && !isVideoUrl(coop.banner) ? (
              <Grid
                item
                xs={12}
                sm={6}
              >
                <img alt="banner" className={classes.img} src={coop.banner} />
              </Grid>
            ) : null}
          </Grid>
          {classifieds.length > 0 ? (
            <div className={classes.classifieds}>
              <Typography className={classes.forSale}>
                For sale by&nbsp;
                {coop.name}
                :
              </Typography>
              <Grid spacing={4} container>
                {classifieds.map((item, i) => (
                  <Grid
                    key={i}
                    xs={12}
                    sm={6}
                    md
                    item
                  >
                    <MarketCard item={item} handleMarketView={handleMarketView} />
                  </Grid>
                ))}
              </Grid>
            </div>
          ) : null}
        </div>
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  const { isConnected, Coops } = await connect();

  const paths = [];

  try {
    if (!isConnected) {
      throw new Error('db not connected');
    }
 
    const coops = await Coops.find({ description: { $exists: true } }).limit(1);

    coops.forEach((coop) => {
      paths.push({ params: { id: coop.id } });
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

  let coop = null;
  let classifieds = [];

  try {
    const {
      activities, isConnected, Coops, Classifieds,
    } = await connect();

    if (!isConnected) {
      throw new Error('db not connected');
    }

    if (!ObjectId.isValid(params.id)) {
      return {
        props: { coop },
      };
    }
    coop = await Coops.findOne({
      _id: ObjectId(params.id),
    }).lean();

    coop = JSON.parse(JSON.stringify(coop)); //  needed to prevent JSON serialization error

    classifieds = await Classifieds.find({
      _coop: ObjectId(params.id),
    })
      .populate('_coop')
      .lean();

    classifieds = JSON.parse(JSON.stringify(classifieds)); //  needed to prevent JSON serialization error

    return {
      revalidate: 1,
      props: {
        coop, classifieds, keywords: coop.activity, activities,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { coop, classifieds },
    };
  }
}
