import React from 'react'

import Toolbar from '@material-ui/core/Toolbar';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    icon: {
      marginRight: theme.spacing(2),
    },
  }));

const Menu = props => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <AppBar position="relative">
                <Toolbar>
                    <DehazeIcon className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap>
                        GameDB
                    </Typography>
                </Toolbar>
            </AppBar>
    </React.Fragment>
    )
}
export default Menu;