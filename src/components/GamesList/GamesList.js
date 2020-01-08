import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import GameCard from '../GameCard/GameCard';

const GamesList = props => {
    const {games,isAuth} = props
    

    return (
        <React.Fragment>
            <Container maxWidth="md">
                <Grid container spacing={4}>
                    {games.map(game => (

                        <GameCard key={game.id} game={game} isAuth={isAuth}/>

                    ))}
                </Grid>

            </Container>
        </React.Fragment>
    );
}


export default GamesList;