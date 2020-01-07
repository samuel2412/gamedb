import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from "@material-ui/core/Grid"
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { makeStyles } from '@material-ui/core/styles';

import GamesList from '../../components/GamesList/GamesList'


const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(5),
  },
}));

const LandingPage = props => {
  const classes = useStyles();
  const { games,nextPage,prevPage,isLoading, onFetchGames,onFetchGameDetail,gamesFetched } = props;

  useEffect(()=>{
    onFetchGames();
  },[])

  useEffect(()=>{
    games.map(game=>{
      onFetchGameDetail(game.id)  
    })  
  },[gamesFetched])

  const nextPageHandler = () => {
    console.log('next')
    onFetchGames(nextPage);
    scrollToTop();
  }

  const prevPageHandler = () => {
    console.log('prev')
    onFetchGames(prevPage);
    scrollToTop();
  }

  const scrollToTop = () => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }


  const spinner = (
    <Container maxWidth="sm" align="center">
      <CircularProgress />
    </Container>
  )

  return (
    <React.Fragment>


      <div className={classes.container}>
        {isLoading ? spinner : <GamesList />}
      </div>

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
    </React.Fragment>
  );
}
const mapStateToProps = state => {
  return {
      isLoading: state.gamesReducer.isLoading,
      games: state.gamesReducer.games,
      prevPage: state.gamesReducer.prevPage,
      nextPage: state.gamesReducer.nextPage,
      gamesFetched: state.gamesReducer.gamesFetched,
  };
}


const mapDispatchToProps = dispatch => {
  return {

      onFetchGames: (url) =>
          dispatch(actions.fetchGames(url)),

    onFetchGameDetail: (id) =>
          dispatch(actions.fetchGameDetail(id))

  };
}


export default connect(mapStateToProps,mapDispatchToProps)(LandingPage);