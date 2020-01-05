import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import Navbar from '../Navigation/Navbar/Navbar'
import Footer from '../Navigation/Footer/Footer';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    content: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
    },
    outerDiv: {
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.85) 15%, rgba(0, 0, 0, 0.2) 40%, rgba(0, 0, 0, 1) 90%)',
        backgroundAttachment: 'fixed',
        margin: 0,
        height: '100vh',
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
                <Footer />

            </div>
        </React.Fragment>
    );
}

export default Layout;