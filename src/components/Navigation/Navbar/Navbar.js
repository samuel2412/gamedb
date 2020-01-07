import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Search from './Search/Search';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



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
    },
    appbar: {
        position: "static",
        height: 100,
        backgroundColor: 'transparent',
        boxShadow: '0',

    }
}));

const Navbar = props => {
    const classes = useStyles();
    const { onFetchGames } = props;


    const filterHandler = useCallback(query => {
        console.log('filter')
        onFetchGames(query)
    }, [onFetchGames]);



    return (
        <div className={classes.grow}>
            <AppBar className={classes.appbar} style={{ boxShadow: 'none' }}>
                <Toolbar>
                    <SideDrawer />

                    <Typography className={classes.title} variant="h6" noWrap>
                        GameDB
                     </Typography>

                    <Search onFilter={filterHandler} />

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