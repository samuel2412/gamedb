import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { makeStyles } from '@material-ui/core/styles';


import GamesCard from '../../components/GamesCard/GamesCard';
import Header from '../../components/Header/Header';

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
}));

const LandingPage = props => {

  const classes = useStyles();
  const baseUrl = 'https://api.rawg.io/api/games?page_size=21';
  const [games, setGames] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [navHeight, setNavHeight] = useState({
    style: {
        height: 310
    }
})

  useEffect(() => {
    fetchGames(baseUrl);
    window.addEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = (event) => {
    let scrollTop = window.scrollY,
        minHeight = 60,
        newHeight = Math.max(minHeight, 310 - scrollTop);
    setNavHeight({
        style: {
            height: newHeight
        }
    });
}

  const fetchGames = (url) => {
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
     
        <Header  style={{ height: navHeight.style.height }}/>
        <div className={classes.container}>
          {isLoading ? spinner : <GamesCard games={games} />}


          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button variant="contained"
                color="primary"
                onClick={prevPageHandler}
                disabled={prevPage === null}>
                <NavigateBeforeIcon />
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained"
                color="primary"
                onClick={nextPageHandler}
                disabled={nextPage === null}>
                <NavigateNextIcon />
              </Button>
            </Grid>
          </Grid>
        </div>
      
    </React.Fragment>
  );
}

export default LandingPage;