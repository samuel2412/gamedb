import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: 'black',
        width: '90vw',
        padding: 0,
        borderRight: 'solid',
        borderRightWidth: '1px',
        borderRightColor: '#00FC87',
    },
    image: {
        width: '100%',
    },
    text: {
        color: '#FFFFFF',
        padding: '0 5% 5% 5%',
        textAlign: 'left',
    },
    border:{
        borderRight: 'solid',
        borderRightWidth: '1px',
        borderRightColor: '#00FC87',
    },
    span: {
        color: '#00FC87'
    }

}));
//230 345  56.25%
const Game = props => {
    const classes = useStyles();
    const game = props.game;

    console.log(game)

    return (
        <Container align='center' className={classes.container}>
            <img className={classes.image} src={game.background_image} />
            <Typography variant="h5" component="h2">
                <span className={classes.span}>
                    {game.name}
                </span>
            </Typography>
            <div className={classes.text}
                dangerouslySetInnerHTML={{ __html: game.description }}>
            </div>
            <Grid item xs={12} className={classes.border}>
                    <div className={classes.text}>
                        <p>placeholder</p>
                    </div>
                </Grid>


            <Grid container spacing={2}>
            <Grid item xs={3} className={classes.border}>
                    <div className={classes.text}>
                        <p className={classes.span}>
                            {`Release Date: `}
                        </p>
                       {game.released}

                    </div>
                </Grid>
                <Grid item  xs={3} className={classes.border}>
                    <div className={classes.text}>
                        <p className={classes.span}>
                            {`Genres: `}
                        </p>
                        {game.genres.map(genre => (
                            <p key={genre.id}>{genre.name}</p>
                        ))}

                    </div>
                </Grid>
                <Grid item xs={3} className={classes.border}>
                    <div className={classes.text}>
                        <p className={classes.span}>
                            ESRB rating:
                        </p>
                        {` ${game.esrb_rating.name}`}
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className={classes.text}>
                        <a style={{textDecoration:'none'}} href={game.website}>
                            <p className={classes.span} >Game WebSite</p>
                        </a>
                    </div>
                </Grid>
            </Grid>

        </Container>
        
    );
}
export default Game