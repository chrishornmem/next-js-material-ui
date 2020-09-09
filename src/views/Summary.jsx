import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '../Typography';

import Highlight from '../Highlight';
import HighlightItem from '../HighlightItem';

const styles = (theme) => ({
  root: {},
});

function Summary(props) {
  const { classes } = props;

  return (
    <Highlight>
      <Typography align="center" variant="h2">An all-in-one community for co-operatives</Typography>
      <HighlightItem align="center">
        Anycoop is a mobile first service made for co-operatives and their members. 
        Discover and collaborate with other co-operatives, buy and sell on the marketplace, 
        engage with members and gain valuable insights with forums, questionnaires, training and so much more... 
      </HighlightItem>
    </Highlight>
  );
}

Summary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Summary);
