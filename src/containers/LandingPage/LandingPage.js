import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid"
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { makeStyles } from '@material-ui/core/styles';


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
  const { games, nextPage, prevPage,
    isLoading, onFetchGames,isAuth, token, userId, 
    likeGame,dislikeGame, fetchLikes,likes } = props;
    

  const filterHandler = useCallback(query => {
    onFetchGames(query)
  }, [onFetchGames]);
  

  useEffect(() => {
    onFetchGames(`https://api.rawg.io/api/games?page=1&page_size=6`);
    if (isAuth) {
      fetchLikes(token, userId)
    }
  }, [onFetchGames,isAuth,token,userId,fetchLikes])

  const nextPageHandler = () => {
    onFetchGames(nextPage);
    scrollToTop();
  }

  const prevPageHandler = () => {
    onFetchGames(prevPage);
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


  const buttonsContainer = (
    <Container align='center' className={classes.container}>
      <Grid container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Button variant="contained" color="secondary" onClick={prevPageHandler} disabled={prevPage === null}>
          <NavigateBeforeIcon />
        </Button>
        <Button variant="contained" color="secondary" onClick={nextPageHandler} disabled={nextPage === null}>
          <NavigateNextIcon />
        </Button>
      </Grid>


    </Container>
  )

  return (
    <React.Fragment>
      <Header />

      <Search onFilter={filterHandler} />
      <div className={classes.container}>
        {isLoading ? spinner :
          <GamesList
            games={games}
            isAuth={isAuth}
            token={token}
            userId={userId}
            likeGame={likeGame}
            dislikeGame={dislikeGame}
            likes={likes}
          />}
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
    isAuth: state.authReducer.tokenId !== null,
    token: state.authReducer.tokenId,
    userId: state.authReducer.userId,
    likes: state.likesReducer.likes
  };
}


const mapDispatchToProps = dispatch => {
  return {

    onFetchGames: (url) =>
      dispatch(actions.fetchGames(url)),

    likeGame: (likeData,token) =>
      dispatch(actions.likeGame(likeData,token)),
      
      dislikeGame: (likeData,token) =>
      dispatch(actions.dislikeGame(likeData,token)),

    fetchLikes: (token, userId) =>
      dispatch(actions.fetchLikes(token, userId))

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
