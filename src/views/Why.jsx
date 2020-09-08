import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

import Container from '@material-ui/core/Container';

import Typography from '../Typography';
import ShowcaseRow from '../ShowcaseRow';
import ShowcaseImage from '../ShowcaseImage';
import ShowcaseDescription from '../ShowcaseDescription';

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

function Why(props) {
  const { classes, containerClassName } = props;

  return (
    <>
      <div className={containerClassName}>
        <Container className={classes.root}>
          <Typography align="center" variant="h1">Serving the needs of co-operatives</Typography>
          <Typography align="center" variant="body1">Anycoop is purpose built to serve the seven principles that all co-operatives follow.</Typography>
          <ShowcaseRow
            direction="row-reverse"
            className={classes.row}
          >
            <ShowcaseImage
              src="users"
              alt="users"
              order={2}
            />
            <ShowcaseDescription>
              <Typography variant="h2" align="left">Attract and retain members</Typography>
              <Typography variant="body1" align="left">Grow your community faster by sending automated invitations in bulk. Members respond to invitations and access all the features using the web, mobile app or menu-driven SMS.</Typography>
            </ShowcaseDescription>
          </ShowcaseRow>
          <ShowcaseRow>
            <ShowcaseImage
              src="vote"
              alt="voting"
              useSvg
              order={2}
            />
            <ShowcaseDescription>
              <Typography variant="h2" align="left">Democratize your co-operative</Typography>
              <Typography variant="body1" align="left">Easily create custom surveys and polls to help you build a truly democratic culture.  Create online elections where members can vote on important topics.  Use questionnaires to receive feedback from members.</Typography>
            </ShowcaseDescription>
          </ShowcaseRow>
          <ShowcaseRow
            direction="row-reverse"
          >
            <ShowcaseImage
              src="training"
              alt="training"
              useSvg
              order={2}
            />
            <ShowcaseDescription>
              <Typography variant="h2" align="left">Educate and train members</Typography>
              <Typography variant="body1" align="left">Create interactive quizzes and incorporate video tutorials and pictures. Assess {"members'"} knowledge on important topics and track their progress and scores in real-time.</Typography>
            </ShowcaseDescription>
          </ShowcaseRow>
          <ShowcaseRow>
            <ShowcaseImage
              src="trade"
              alt="trading"
              useSvg
              order={2}
            />
            <ShowcaseDescription>
              <Typography variant="h2" align="left">Facilitate trade with other co-operatives</Typography>
              <Typography variant="body1" align="left">Use the marketplace to buy and sell goods either internally or with other co-operatives. Members earn and save by sourcing and sharing resources.</Typography>
            </ShowcaseDescription>
          </ShowcaseRow>
          <ShowcaseRow
            direction="row-reverse"
          >
            <ShowcaseImage
              src="environment"
              alt="environment"
              useSvg
              order={2}
            />
            <ShowcaseDescription>
              <Typography variant="h2" align="left">Reduce environmental impact</Typography>
              <Typography variant="body1" align="left">Be environmentally friendly by eliminating paper-based forms, surveys and questionnaires.</Typography>
            </ShowcaseDescription>
          </ShowcaseRow>
        </Container>
      </div>
    </>
  );
}

Why.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Why);


//Members and admins can using SMS, web or app.  Let your members decide.from any device and any channel keeps your members happy and engaged