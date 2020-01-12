import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Link from '@material-ui/core/Link';


const Copyright = () => {
    return (
        <div style={{ color: '#FFFFFF' }}>
            <Typography variant="body2" align="center">
                {'Developer '}
                <Link color="inherit" href="https://github.com/samuel2412">
                    GitHub
      </Link>{'.'}
            </Typography>
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: 'transparent',
        padding: theme.spacing(6),
        boxShadow: 'none',
    },
}));

const Footer = props => {
    const classes = useStyles();

    return (
        <div className={classes.footer} style={{ color: '#FFFFFF' }}>
            <Typography variant="h6" align="center" gutterBottom >
                GameDB
        </Typography>
            <Typography variant="subtitle1" align="center" component="p">
                Application developed using React.js
        </Typography>
            <Copyright />
        </div>
    );

}
export default Footer;