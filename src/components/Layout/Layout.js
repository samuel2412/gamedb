import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import Navbar from '../Navigation/Navbar/Navbar'
import Footer from '../Navigation/Footer/Footer';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    outerDiv: {
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.85) 15%, rgba(0, 0, 0, 0.2) 45%, rgba(0, 0, 0, 1) 90%)',
        backgroundAttachment: 'fixed',
        margin: 0,
        height:'100%',
        minHeight: '100vh',
        position: 'relative',
    },
    content: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(25),
        height: 'auto',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 'auto',
    }
}));

const Layout = props => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.outerDiv}>
                <Navbar />
                <div className={classes.content} >
                    {props.children}
                </div>
                <div className={classes.footer}>
                <Footer />
                </div>
               
            </div>

        </React.Fragment>
    );
}

export default Layout;