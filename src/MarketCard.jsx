// Render Prop
import React from 'react';
import { useRouter } from 'next/router';

import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import ReactPlayer from 'react-player';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { isVideoUrl, joinWords, formatCurrency } from './utils';
import Typography from './Typography';

const styles = (theme) => ({
  card: {},
  // cardActions: {
  //   flex: '50px 1 1',
  // },
  // content: {
  //   maxHeight: 200,
  //   display: 'flex',
  //   flexDirection: 'column',
  // },
  description: {
		fontWeight: theme.typography.fontWeightLight,
		paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
	},
	price: {
	},
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
    textTransform: 'capitalize',
  },
  textContent: {
    maxHeight: "10rem",
    overflow: 'hidden',
  },
  title: {
    textTransform: 'capitalize',
  },
});

const MarketCard = React.forwardRef((props, ref) => {
  const {
    item,
    classes,
    className,
    style,
    handleMarketView,
    ...other
  } = props;

  const router = useRouter();

  function makeSubheader(coop) {
    if (!coop) return '';
    const { name, city, country } = coop;
    return joinWords(', ', name, city, country);
  }

  React.useEffect(() => {
    router.prefetch(
      {
        pathname: '/marketplace/[id]',
        query: { keywords },
      },
      `/marketplace/${item._id}`,
    );
  }, []);

  return (
    <Card className={classes.card} raised>
      <CardActionArea onClick={(e) => handleMarketView(e, item)}>
        <CardHeader
          style={!item.media ? { paddingBottom: 0 } : null}
          title={item.title}
          titleTypographyProps={{ className: classes.title }}
          subheader={makeSubheader(item._coop)}
          subheaderTypographyProps={{ className: classes.subheader }}
        />
        {item.media && isVideoUrl(item.media) ? (
          <CardMedia>
            <div className={classes.playerWrapper}>
              <ReactPlayer
                className={classes.reactPlayer}
                controls
                light
                url={item.media}
                title={item.title}
                width="100%"
                height="100%"
              />
            </div>
          </CardMedia>
        ) : null}
        {item.media && !isVideoUrl(item.media) ? (
          <CardMedia
            className={classes.media}
            image={item.media || '/images/coop-placeholder.png'}
            title={item.title}
          />
        ) : null}
        <CardContent
          className={classes.content}
          style={!item.media ? { paddingTop: 4 } : null}
        >
          <div className={classes.textContent}>
            <Typography className={classes.price} variant="subtitle2">
              {item?._coop?.currency ? `${item._coop.currency} ${formatCurrency(item.price)}` : '' }
            </Typography>
            <Typography className={classes.description} variant="subtitle2">
              {item.description}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

export default withStyles(styles, { name: 'MarketCard' })(MarketCard);
