// Render Prop
import React from 'react';
import { useRouter } from 'next/router';

import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import indigo from '@material-ui/core/colors/indigo';

import ReactPlayer from 'react-player';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { isVideoUrl, joinWords } from './utils';
import Typography from './Typography';

const styles = (theme) => ({
  /* Styles applied to the root element. */
	address: {
		textTransform: 'capitalize',
	},
	media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  placeholder: {
    minHeight: 200,
    backgroundColor: indigo['50'],
  },
  playerWrapper: {
    position: 'relative',
    paddingTop: '56.25%', /* 720 / 1280 = 0.5625 */
  },
	root: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(6),
	},
	reactPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
	},
	subheader: {
		wordBreak: 'break-word',
		overflowWrap: 'break-word',
		fontSize: '1rem',
	},
	title: {
		textTransform: 'capitalize',
	},
});

const CoopCard = React.forwardRef((props, ref) => {
  const {
    coop = {},
    classes,
    className,
    placeholder = false,
		style,
		handleCoopView,
    ...other
  } = props;

	const router = useRouter();

	React.useEffect(() => {
    router.prefetch(
      {
        pathname: '/coop/[id]',
        query: { keywords },
      },
      `/coop/${coop._id}`,
    );
	},[])

  function makeAddress(coop) {
    if (!coop) return '';
    const { address, city, state, postCode, country } = coop;
    return joinWords(', ', address, city, state, postCode, country);
  }

	const address = makeAddress(coop);
  

  return (
    <Card className={clsx(
      {
        [classes.placeholder]: placeholder
      },
    )} raised={!placeholder}>
      <CardActionArea onClick={(e) => handleCoopView(e, coop)}>
        <CardHeader
					style={!coop.banner ? {paddingBottom: 0} : null}
					title={coop.name}
					titleTypographyProps={{ className: classes.title }}
          subheader={coop.activity}
          subheaderTypographyProps={{ className: classes.subheader }}
        />
        {coop.banner && isVideoUrl(coop.banner) ? (
          <CardMedia>
            <div className={classes.playerWrapper}>
              <ReactPlayer
                className={classes.reactPlayer}
                controls
                light
                url={coop.banner}
                title={coop.name}
                width="100%"
                height="100%"
              />
            </div>
          </CardMedia>
        ) : null}
        {coop.banner && !isVideoUrl(coop.banner) ? (
          <CardMedia
            className={classes.media}
            image={coop.banner || '/images/coop-placeholder.png'}
            title={coop.name}
          />
        ) : null}
        <CardContent
					style={!coop.banner ? { paddingTop: 4 } : null}
				>
          {address ? (
          <Typography className={classes.address} variant="subtitle2">
            {address}
          </Typography>
          ) : null}
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

export default withStyles(styles, { name: 'CoopCard' })(CoopCard);
