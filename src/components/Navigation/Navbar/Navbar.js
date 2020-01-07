import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import Search from './Search/Search';
import { NavLink,Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'



import SideDrawer from './SideDrawer/SideDrawer'

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        color: '#FFFFFF'
    },
    appbar: {
        position: "static",
        backgroundColor: 'transparent',
        boxShadow: 'none',
    },
    navLink: {
        textDecoration: 'none',
    },

}));

const Navbar = props => {
    const classes = useStyles();
    const { onFetchGames } = props;
    const [isLogClicked, setIsLogClicked] = useState('')


    const filterHandler = useCallback(query => {
        console.log('filter')
        onFetchGames(query)
    }, [onFetchGames]);

    const title = (
        <Link to='/' className={classes.navLink}>
            <Typography className={classes.title} variant="h6" noWrap>
                GameDB
                     </Typography>
        </Link>
    );
    const loginButton = (
        <React.Fragment>
            <div style={{ flexGrow: 1 }}></div>
            <NavLink
                isActive={(match) => {
                    if (match) {
                        setIsLogClicked(true)
                    } else {
                        setIsLogClicked(false)
                    }
                }}
                className={classes.navLink}
                exact to='/login'>
                <Button color="secondary"
                    variant={isLogClicked ? 'contained' : 'outlined'}
                >
                    Login
        </Button>
            </NavLink>
        </React.Fragment>
    );

    return (
        <div className={classes.grow}>
            <AppBar className={classes.appbar}>
                <Toolbar>
                    <SideDrawer />

                    {title}

                    <Search onFilter={filterHandler} />

                    {loginButton}

                </Toolbar>
            </AppBar>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        games: state.gamesReducer.games,
    };
}
const mapDispatchToProps = dispatch => {
    return {

        onFetchGames: (url) =>
            dispatch(actions.fetchGames(url))

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);