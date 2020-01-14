import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import GameCard from '../GameCard/GameCard';

const GamesList = props => {
    const { games, isAuth, token, userId, likeGame, dislikeGame, likes } = props
    /*    if (likes[0]) {
        console.log(likes[0].id==3498)
    }
     const getFruit = likes.find(like => like.gameId === 3498);
     //console.log(likes.find( () =>(gameId, index, likes),'3498'))
  */
    //console.log(token)

    return (
        <React.Fragment>
            <Container maxWidth="md">
                <Grid container spacing={4}>
                    {games.map(game => (

                        <GameCard
                            key={game.id}
                            game={game}
                            isAuth={isAuth}
                            token={token}
                            userId={userId}
                            likeGame={likeGame}
                            dislikeGame={dislikeGame}
                            likedByUser={likes.find(like => Number(like.id) === game.id)}
                        />

                    ))}
                </Grid>

            </Container>
        </React.Fragment>
    );
}


export default GamesList;