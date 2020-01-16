import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import CardGame from '../../components/GameCard/GameCard';
import * as actions from '../../store/actions/index';


const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(10),
    }
}));



const GameDetail = props => {
    const classes = useStyles();
    const { isAuth, token, userId, likeGame, dislikeGame, fetchLikes, likes,
        completedGame, uncompletedGame, completeds,fetchCompleted } = props;
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
           
        if (isAuth && likes.length === 0 ) {
            fetchLikes(token, userId)
            fetchCompleted(token,userId)
        }
    }, [props.match.params.id, isAuth, token, userId, fetchLikes,fetchCompleted,likes])


    let detail = (
        <Container align="center" maxWidth="md" className={classes.container}>
            <CircularProgress color="secondary" />
        </Container>
    );
    if (!isLoading) {
        detail = (
            <Container maxWidth="md" className={classes.container}>

                <CardGame
                    isDetail={true}
                    game={game}
                    isAuth={isAuth}
                    token={token}
                    userId={userId}
                    likeGame={likeGame}
                    dislikeGame={dislikeGame}
                    likedByUser={likes.find(like => Number(like.id) === game.id)}
                    completedGame={completedGame}
                    uncompletedGame={uncompletedGame}
                    completedByUser={completeds.find(completed => Number(completed.id) === game.id)}>
                    <br />
                    {game.playtime ?
                        <Typography variant="body2" color="textSecondary" component="p">
                            Average playtime: {game.playtime} hours.
                    </Typography>
                        : null}

                    {game.released ?
                        <Typography variant="body2" color="textSecondary" component="p">
                            Released: {game.released}
                        </Typography>
                        : null}

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

const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.tokenId !== null,
        token: state.authReducer.tokenId,
        userId: state.authReducer.userId,
        likes: state.likesReducer.likes,
        completeds: state.completedReducer.completeds
    };
}


const mapDispatchToProps = dispatch => {
    return {

        likeGame: (likeData, token) =>
            dispatch(actions.likeGame(likeData, token)),

        dislikeGame: (likeId, token) =>
            dispatch(actions.dislikeGame(likeId, token)),

        fetchLikes: (token, userId) =>
            dispatch(actions.fetchLikes(token, userId)),

        completedGame: (completedData, token) =>
            dispatch(actions.completedGame(completedData, token)),

        uncompletedGame: (completedData, token) =>
            dispatch(actions.uncompletedGame(completedData, token)),

        fetchCompleted: (token, userId) =>
            dispatch(actions.fetchCompleted(token, userId))

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetail);
