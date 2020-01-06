import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import GameCard from './GameCard/GameCard';

const GamesList = props => {
    const games = props.games;



    return (
        <React.Fragment>
            <Container maxWidth="md">
                <Grid container spacing={4}>

                    {games.map(game => (
                        <Grid item key={game.id} xs={12} >
                            <GameCard game={game} />
                        </Grid>
                    ))}
                </Grid>

            </Container>
        </React.Fragment>
    );
}
export default GamesList