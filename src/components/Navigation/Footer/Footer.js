import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                GameDB
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: 'transparent',
        padding: theme.spacing(6),
    },
}));

const Footer = props => {
    const classes = useStyles();

    return (
        <div className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
                Footer
        </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Something here to give the footer a purpose!
        </Typography>
            <Copyright />
        </div>
    );

}
export default Footer;