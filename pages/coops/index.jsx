import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Grid from '@material-ui/core/Grid';

import Breadcrumbs from '../../src/Breadcrumbs';
import Link from '../../src/Link';
import CoopCard from '../../src/CoopCard';
import MarketCard from '../../src/MarketCard';
import Typography from '../../src/Typography';
import PanelContainer from '../../src/PanelContainer';
import PanelSide from '../../src/PanelSide';
import PanelMain from '../../src/PanelMain';
import PanelSideItem from '../../src/PanelSideItem';

import { connect } from '../../src/utils/db';
import Search from '../../src/Search';

const useStyles = makeStyles((theme) => ({
  breadcrumbs: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(6),
  },
  error: {
    alignSelf: 'center',
    width: '100%',
    color: theme.palette.error.main,
    paddingTop: '0px !important',
  },
  formControl: {
    marginLeft: theme.spacing(7),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(4),
    },
  },
  formControlLabel: {
    fontSize: '1rem',
  },
  gridContainer: {
    padding: theme.spacing(6),
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
    paddingTop: theme.spacing(3),
  },
  group: {
    // margin: theme.spacing(1, 0),
    fontSize: '1rem',
  },
  link: {
    fontSize: '1rem',
    backgroundColor: 'transparent',
  },
  search: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '66%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  sidePanel: {
    marginRight: theme.spacing(2),
  },
  ul: {
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
  },
}));

function Coops({ activities }) {
  const classes = useStyles();
  const router = useRouter();

  const {
    keywords, page, limit = 0,
  } = router?.query;

  const query = router?.query;

  const initialView = query.view || 'directory';

  const initialClassifieds = {
    data: [],
    limit,
    page: 1,
    pageCount: 0,
    total: 0,
  };

  const initialCoops = {
    data: [],
    limit,
    page: 1,
    pageCount: 0,
    total: 0,
  };

  const [currentCoopsPage, setCoopsPage] = React.useState(initialView === 'directory' ? page : 1);
  const [currentClassifiedsPage, setClassifiedsPage] = React.useState(initialView === 'market' ? page : 1);
  const [view, setView] = React.useState(initialView);
  const [isLoading, setIsLoading] = React.useState(false);
  const [coops, setCoops] = React.useState(initialCoops);
  const [classifieds, setClassifieds] = React.useState(initialClassifieds);

  const handleSearch = ({pathname, query}) => {
    if (pathname?.startsWith('/coops')) {
      query.view = view;
    }
    router.push({ pathname, query });
  };

  const handlePageChange = (event, page) => {
    if (view === 'market') {
      setClassifiedsPage(page);
    } else {
      setCoopsPage(page);
    }
    router.replace({
      pathname: '/coops',
      query: { keywords, page, view },
    },
    undefined,
    { shallow: true });
    window.scrollTo(0, 0);
  };

  function handleViewChange(event) {
    setView(event.target.value);
    const page = event.target.value === 'market' ? currentClassifiedsPage : currentCoopsPage;
    router.replace({
      pathname: '/coops',
      query: { keywords, page, view: event.target.value },
    },
    undefined,
    { shallow: true });
  }

  const handleCoopView = (event, coop, keywords) => {
    router.push(
      {
        pathname: '/coop/[id]',
        query: { keywords },
      },
      `/coop/${coop._id}`,
    );
  };

  const handleMarketView = (event, marketItem, keywords) => {
    router.push(
      {
        pathname: '/classified/[id]',
        query: { keywords, view },
      },
      `/classified/${marketItem._id}`,
    );
  };

  React.useEffect(() => {
    setCoopsPage(1);
    setClassifiedsPage(1);
  }, [query.keywords]);

  React.useEffect(() => {
    async function fetchCoops() {
      if (typeof keywords === 'undefined' || String(keywords).length === 0) {
        return;
      }
      try {
        setIsLoading(true);
        const response = await fetch(`/api/coops?keywords=${keywords}&view=${view}&page=${currentCoopsPage}&limit=${limit || '0'}`, {
          method: 'get',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'X-Requested-With': 'XMLHttpRequest',
          },
        });
        const res = await response.json();
        if (res) {
          setCoops(res);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    }
    setCoops(initialCoops);
    fetchCoops();
  }, [query.keywords, currentCoopsPage]);

  React.useEffect(() => {

    async function fetchClassifieds() {
      if (typeof keywords === 'undefined' || String(keywords).length === 0) {
        return;
      }
      try {
        const response = await fetch(`/api/classifieds?keywords=${keywords}&view=${view}&page=${currentClassifiedsPage}&limit=${limit || '0'}`, {
          method: 'get',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'X-Requested-With': 'XMLHttpRequest',
          },
        });
        const res = await response.json();
        if (res) {
          setClassifieds(res);
          if (res.data.length === 0) {
            setView('directory');
          }
        }
      } catch (error) {}
    }
    setClassifieds(initialClassifieds);
    fetchClassifieds();
  }, [query.keywords, currentClassifiedsPage]);

  /*
  * Following 'dumb' code is needed to handle browser back history changes
  */
  // React.useEffect(() => {
  //   setMarketValue(initialMarketValue);
  // }, [market]);

  // if (result.coops?.length === 1) {
  //   return (<div style={{ minHeight: '100vh' }} />);
  // }

  return (
    <>
      <Head>
        <title key="title">Anycoop - Search results</title>
        <meta property="og:title" content="Anycoop - Search results" />
        <meta key="description" name="description" content="An all-in-one membership management solution designed for co-operatives" />
        <meta key="metaDescription" property="og:description" content="An all-in-one membership management solution designed for co-operatives" />
      </Head>
      <Container>
        <Search
          className={classes.search}
          initialValue={keywords} 
          handleSubmit={handleSearch}
        />
        <Breadcrumbs>
          <Link color="inherit" href="/">
            <Typography className={classes.link}>Home</Typography>
          </Link>
          <Typography className={classes.link} color="textPrimary">{keywords}</Typography>
        </Breadcrumbs>
        {classifieds.total > 0 && (
          <Grid container spacing={0}>
            <Grid item xs={false} sm={2} />
            <Grid item xs={12} sm={10}>
              <FormControl component="fieldset" className={classes.formControl}>
                <RadioGroup
                  row
                  aria-label="toggle view"
                  name="toggle"
                  className={classes.group}
                  value={view}
                  onChange={handleViewChange}
                >
                  <FormControlLabel
                    classes={{ label: classes.formControlLabel }}
                    value="directory"
                    control={<Radio />}
                    label={`Directory (${coops.total.toLocaleString()})`}
                  />
                  <FormControlLabel
                    classes={{ label: classes.formControlLabel }}
                    value="market"
                    control={<Radio />}
                    label={`Marketplace (${classifieds.total.toLocaleString()})`}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        )}
        <PanelContainer className={classes.gridContainer}>
          <PanelSide className={classes.sidePanel}>
            {activities.map((activity, i) => (
              <PanelSideItem
                key={i}
                active={keywords?.trim().toLowerCase() === activity?.toLowerCase()}
                value={activity}
                href={{ pathname: '/coops', query: { keywords: activity } }}
              />
            ))}
          </PanelSide>
          <PanelMain title={view === 'market' ? 'Marketplace' : 'Directory'}>
            {isLoading && (
            <>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
              >
                <CoopCard placeholder />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
              >
                <CoopCard placeholder />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
              >
                <CoopCard placeholder />
              </Grid>
            </>
            )}
            {!isLoading && coops.data?.length === 0 && classifieds.data.length === 0 && (
              <Grid item className={classes.error}>
                <Typography align="center">
                  No results matching &apos;
                  {keywords}
                  &apos;
                </Typography>
              </Grid>
            )}
            {view === 'directory' && coops.data?.length > 0 && coops.data.map((coop, i) => (
              <Grid
                key={i}
                item
                xs={12}
                sm={6}
                md={4}
              >
                <CoopCard coop={coop} handleCoopView={(event, coop) => handleCoopView(event, coop, keywords)} />
              </Grid>
	          ))}
            {view === 'market' && classifieds.data.length > 0 && classifieds.data.map((item, i) => (
              <Grid
                key={i}
                item
                xs={12}
                sm={6}
                md={4}
              >
                <MarketCard item={item} handleMarketView={(event, market) => handleMarketView(event, market, keywords)} />
              </Grid>
	          ))}
            {!isLoading && (
              <Grid
                item
                xs={12}
              >
                {view === 'market' && classifieds.pageCount > 1 && (
                <Pagination
                  classes={{ ul: classes.ul }}
                  count={classifieds.pageCount}
                  page={currentClassifiedsPage}
                  onChange={handlePageChange}
                />
                )}
                {view === 'directory' && coops.pageCount > 1 && (
                <Pagination
                  classes={{ ul: classes.ul }}
                  count={coops.pageCount}
                  page={currentCoopsPage}
                  onChange={handlePageChange}
                />
                )}
              </Grid>
            )}
          </PanelMain>
        </PanelContainer>
      </Container>
    </>
  );
}

export async function getStaticProps() {

  try {
    const {
      activities, isConnected,
    } = await connect();

    if (!isConnected) {
      throw new Error('db not connected');
    }

    return {
      props: { activities },
    };
    
  } catch (error) {
    console.error(error);
    return {
      props: { activities: [] },
    };
  }
}

export default Coops;
