import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { makeStyles } from '@material-ui/core/styles';

import GamesList from '../../components/GamesList/GamesList'


const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(1)
  },
}));

const LandingPage = props => {

  const classes = useStyles();
  const [games, setGames] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchGames();
    
  }, []);


  const fetchGames = (url='https://api.rawg.io/api/games?page_size=6') => {
    setIsLoading(true);
    axios.get(url, {
      headers: {
        "User-Agent": "GameDB"
      }
    })
      .then((response) => {
        console.log(response);
        setGames(response.data.results);
        setPrevPage(response.data.previous)
        setNextPage(response.data.next);
        setIsLoading(false);
        scrollToTop();
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false);
      })
  }

  const nextPageHandler = () => {
    console.log('next')
    fetchGames(nextPage);
  }

  const prevPageHandler = () => {
    console.log('prev')
    fetchGames(prevPage);
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
        {isLoading ? spinner : <GamesList games={games}/>}

        <Container align='center' className={classes.container}>
        <Button variant="outlined" color="primary" onClick={prevPageHandler} disabled={prevPage===null}>
          <NavigateBeforeIcon />
        </Button>
        <Button variant="outlined" color="primary" onClick={nextPageHandler} disabled={nextPage===null}>
          <NavigateNextIcon />
        </Button>
      </Container>
      </div>
    </React.Fragment>
  );
}

export default LandingPage;