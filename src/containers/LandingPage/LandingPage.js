import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';


import Pagination from '../../components/Navigation/Pagination/Pagination'
import * as actions from '../../store/actions/index';
import GamesList from '../../components/GamesList/GamesList';
import Header from '../../components/Header/Header';
import Search from '../../components/Search/Search';


const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(5),
  },
}));

const LandingPage = props => {
  const classes = useStyles();
  const currentPage = props.match.params.page;
  const { games, nextPage, prevPage, isLoading, onFetchGames,gameCount, isAuth } = props;

  const filterHandler = useCallback(query => {
    onFetchGames(query)
  }, [onFetchGames]);

  useEffect(() => {
    onFetchGames(`https://api.rawg.io/api/games?page=${currentPage}&page_size=6`);
  }, [onFetchGames,currentPage])

  const changePageHandler = (newPage) =>{
    props.history.push(`/${newPage}`)
    scrollToTop();
  }

  const scrollToTop = () => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }

  const spinner = (
    <Container maxWidth="sm" align="center">
      <CircularProgress color="secondary" />
    </Container>
  )

console.log(games.length)

  const buttonsContainer = (
    <Container  align='center' className={classes.container}>

      
      <Pagination
      currentPage={currentPage}
      changePageHandler={changePageHandler}
        prevPage={prevPage}
        nextPage={nextPage}
        gameCount={gameCount}
      />

      


    </Container>
  )

  return (
    <React.Fragment>
      <Header />

      <Search onFilter={filterHandler} />
      <div className={classes.container}>
        {isLoading ? spinner : <GamesList games={games} isAuth={isAuth} />}
      </div>

      {buttonsContainer}


    </React.Fragment>
  );
}
const mapStateToProps = state => {
  return {
    isLoading: state.gamesReducer.isLoading,
    games: state.gamesReducer.games,
    prevPage: state.gamesReducer.prevPage,
    nextPage: state.gamesReducer.nextPage,
    gameCount: state.gamesReducer.gameCount,
    isAuth: state.authReducer.tokenId !== null,
  };
}


const mapDispatchToProps = dispatch => {
  return {

    onFetchGames: (url) =>
      dispatch(actions.fetchGames(url)),

  };
}


export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);