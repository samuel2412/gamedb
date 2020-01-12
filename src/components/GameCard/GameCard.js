import React, { useState } from 'react';
import axios from 'axios';

import Media from './Media/Media';
import Content from './Content/Content';
import Actions from './Actions/Actions';

import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    }
}));

const GameCard = props => {
    const classes = useStyles();
    const [game, setGame] = useState(props.game);
    const [expanded, setExpanded] = useState(false);
    const [favorite, setFavorite] = useState(props.likedByUser);
    const [done, setDone] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchGameDetail = () => {
        setIsLoading(true)
        axios.get(`https://api.rawg.io/api/games/${game.id}`)
            .then(response => {
                setGame(response.data)
                setIsLoading(false)
            })
            .catch(err => {
                setIsLoading(false)
            })

    }
    const handleExpandClick = () => {
        if (!game.description) {
            fetchGameDetail();
        }
        setExpanded(!expanded);
    };
    const handleFavoriteClick = () => {
        if (!favorite) {
            props.likeGame({ userId: props.userId, gameId: game.id }, props.token);
            setFavorite(!favorite);
        }else{
            props.dislikeGame(favorite.id, props.token);
            setFavorite(!favorite);
        }
    }
    const handleDoneClick = () => {
        setDone(!done);
    }

    return (
        <React.Fragment>

            <Grid item xs={12} >

                <Card className={classes.card}>

                    <Media image={game.background_image} />

                    <Content
                        name={game.name}
                        description={game.description}
                        expanded={expanded}
                        isLoading={isLoading}
                        children={props.children}
                    />

                    <Actions
                        handleFavoriteClick={handleFavoriteClick}
                        handleExpandClick={handleExpandClick}
                        handleDoneClick={handleDoneClick}
                        done={done}
                        favorite={favorite}
                        expanded={expanded}
                        isAuth={props.isAuth}
                    />

                </Card>
            </Grid>

        </React.Fragment>
    );
}

export default GameCard;