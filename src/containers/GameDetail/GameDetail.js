import React, { useState,useEffect } from 'react';
import {connect} from  'react-redux';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container'

import CardGame from '../../components/GameCard/GameCard';


const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(10),
      },
}));

const GameDetail = props => {
    const classes = useStyles();
    const [game, setGame] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const {isAuth} = props;


useEffect(()=>{

    axios.get(`https://api.rawg.io/api/games/${props.match.params.id}`)
    .then(response => {
        setGame(response.data)
        setIsLoading(false);
    })
    .catch(err => {
        setIsLoading(false);
    })
},[])
    
    
    return (
        <Container align="center" maxWidth="md" className={classes.container}>
            {isLoading
            ? <CircularProgress color="secondary" />
            : <CardGame game={game} isAuth={isAuth} ><p>children</p></CardGame>}
        </Container>
    );
}

const mapStateToProps = state =>{
    return {
        isAuth: state.authReducer.tokenId !== null,
    };
}

export default connect(mapStateToProps)(GameDetail);