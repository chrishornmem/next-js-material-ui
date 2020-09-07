import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FacebookProvider, Like } from 'react-facebook';

const styles = (theme) => ({

});

function CustomFacebook(props) {
  const { children, classes, ...other } = props;

  return (
    <FacebookProvider appId="574703859875301">
      <span {...other}>
      <Like 
        href="https://www.facebook.com/Anycoop.zone/" 
        action="like"
        size="small"
        layout="button_count"
        share 
      />
    </span>
    </FacebookProvider>
  );
}

export default withStyles(styles)(CustomFacebook);
