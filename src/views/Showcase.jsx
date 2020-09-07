import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import Container from '@material-ui/core/Container';

import ShowcaseRow from '../ShowcaseRow';
import ShowcaseImage from '../ShowcaseImage';
import ShowcaseDescription from '../ShowcaseDescription';
import Typography from '../Typography';

const styles = (theme) => ({
  box: {
    backgroundColor: indigo['50'],
  },
  root: {
    //  color: theme.palette.secondary.main,
    padding: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(16),
      paddingRight: theme.spacing(16),
    },
  },
  row: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
});

function Showcase(props) {
  const { classes, containerClassName } = props;

  return (
    <>
      <div className={containerClassName}>
        <Container className={classes.root}>
          {/* <Typography align="center" variant="subtitle1">Built for co-operatives</Typography>
          <Typography align="center" variant="body1">The first member engagement solution made specifically for co-operatives of all sizes.  Anycoop helps co-operatives achieve the seven guiding principles.</Typography> */}
          <ShowcaseRow
            direction="row-reverse"
            className={classes.row}
          >
            <ShowcaseImage
              src="celebration"
              alt="celebration"
              order={2}
              useSvg
            />
            <ShowcaseDescription>
              <Typography variant="h2" align="left">Happier members</Typography>
              <Typography variant="body1" align="left">Increase member satisfaction by communicating more effectively through interactive news and forums.  
              Give your members a voice by creating polls, surveys and questionnaires and get instant results.</Typography>
            </ShowcaseDescription>
          </ShowcaseRow>
          <ShowcaseRow>
            <ShowcaseImage
              src="stepping-up"
              alt="stepping up"
              useSvg
              order={2}
            />
            <ShowcaseDescription>
              <Typography variant="h2" align="left">Grow your membership</Typography>
              <Typography variant="body1" align="left">With our global directory, anyone can discover your co-operative and read your story. New members can sign-up easily via unique invitation codes.</Typography>
            </ShowcaseDescription>
          </ShowcaseRow>
          <ShowcaseRow
            direction="row-reverse"
          >
            <ShowcaseImage
              src="time-management"
              alt="time management"
              useSvg
              order={2}
            />
            <ShowcaseDescription>
              <Typography variant="h2" align="left">Save your valuable time</Typography>
              <Typography variant="body1" align="left">Get things done faster by automating engagement with members. Broadcast the latest information to your community including news, questionnaires, training and events.</Typography>
            </ShowcaseDescription>
          </ShowcaseRow>
          <ShowcaseRow>
            <ShowcaseImage
              src="reading-book"
              alt="reading book"
              useSvg
              order={2}
            />
            <ShowcaseDescription>
              <Typography variant="h2" align="left">Increase knowledge and awareness</Typography>
              <Typography variant="body1" align="left">Increase competence and understanding across your membership by creating remote training and assessment programmes, maintaining FAQs, testing member knowledge through interactive quizzes.</Typography>
            </ShowcaseDescription>
          </ShowcaseRow>
          <ShowcaseRow
            direction="row-reverse"
          >
            <ShowcaseImage
              src="growth-curve"
              alt="growth curve"
              useSvg
              order={2}
            />
            <ShowcaseDescription>
              <Typography variant="h2" align="left">Increase revenue</Typography>
              <Typography variant="body1" align="left">Showcase your products and services to a global audience.  Increase collaboration with other co-operatives by creating multimedia marketplace listings and integrated messaging capability.</Typography>
            </ShowcaseDescription>
          </ShowcaseRow>
        </Container>
      </div>
    </>
  );
}

Showcase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Showcase);
