import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Link from '@material-ui/core/Link';


const Copyright = () => {
    return (
        <div style={{ color: '#FFFFFF' }}>
            <Typography variant="body2" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://material-ui.com/">
                    GameDB
      </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
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
                Footer
        </Typography>
            <Typography variant="subtitle1" align="center" component="p">
                Something here to give the footer a purpose!
        </Typography>
            <Copyright />
        </div>
    );

}
export default Footer;