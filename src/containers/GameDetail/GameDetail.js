import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import CardGame from '../../components/GameCard/GameCard';


const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(10),
    }
}));



const GameDetail = props => {
    const classes = useStyles();
    const [game, setGame] = useState({});
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {

        axios.get(`https://api.rawg.io/api/games/${props.match.params.id}`)
            .then(response => {
                setGame(response.data)
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
            })
    }, [props.match.params.id])
    console.log(game)

    let detail = (
        <Container align="center" maxWidth="md" className={classes.container}>
            <CircularProgress color="secondary" />
        </Container>
    );
    if (!isLoading) {
        detail = (
            <Container maxWidth="md" className={classes.container}>

                <CardGame game={game} >
                <br />
                    {game.playtime ?
                    <Typography variant="body2" color="textSecondary" component="p">
                        Average playtime: {game.playtime} hours.
                    </Typography>
                    :null}

                    {game.released ?
                    <Typography variant="body2" color="textSecondary" component="p">
                        Released: {game.released}
                    </Typography>
                    :null}

                    {game.esrb_rating ? 
                    <Typography variant="body2" color="textSecondary" component="p">
                        ESRB rating: {game.esrb_rating.name}
                    </Typography>
                    : null
                    }

                    {game.clip ?
                        <Container align="center">
                            <video width="320" height="240" controls>
                                <source src={game.clip.clip} type="video/mp4" />
                                Your browser does not support the video tag.
                        </video>
                        </Container>
                        : null
                    }
                    <br />
                    {game.website ?
                        <Typography variant="body2" color="textSecondary" component="p">
                            Website: <a href={game.website}>{game.website}</a>
                        </Typography>
                        : null}

                </CardGame>

            </Container>
        );
    }

    return (
        detail
    );
}

export default GameDetail;