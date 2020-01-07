import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'

import SideDrawer from './SideDrawer/SideDrawer';
import NavButton from '../NavButton/NavButton';
import logo from '../../../resources/logo128.png';

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    navLink: {
        textDecoration: 'none',
    },
    title: {

        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        color: '#FFFFFF',
    },
    appbar: {
        position: "static",
        backgroundColor: 'transparent',
        boxShadow: 'none',
    },
    logo: {
        height: '30px',
        maxWidth: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: '5px'
    },
}));

const Navbar = props => {
    const classes = useStyles();
    const { isAuth } = props;

    const title = (
        <Link to='/' className={classes.navLink}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>

                <img src={logo} alt="logo" className={classes.logo} />

                <Typography className={classes.title} variant="h6" noWrap>
                    GameDB
                     </Typography>
            </div>
        </Link>
    );
    console.log(isAuth)
    const loginButton = (
      
        <React.Fragment>
            <div style={{ flexGrow: 1 }}></div>

            {!isAuth ?
                <NavButton link='/authentication' label='Login' />
                : <NavButton link='/logout' label='Logout' />
            }


        </React.Fragment>
    );

    return (
        <div className={classes.grow}>
            <AppBar className={classes.appbar}>
                <Toolbar>
                    <SideDrawer />

                    {title}

                    {loginButton}

                </Toolbar>
            </AppBar>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.tokenId !== null,
    };
}


export default connect(mapStateToProps)(Navbar);