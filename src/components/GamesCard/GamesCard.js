import React from 'react';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    cardGrid: {
        
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    }
}));

const GamesCard = props => {
    const classes = useStyles();
    const games = props.games;

    return (
        <React.Fragment>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {games.map(game => (
                        <Grid item key={game.id} xs={12} sm={6} md={4}>
                            
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={game.background_image}
                                    title={game.slug}
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {game.name}
              </Typography>
                                  
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        View
              </Button>
                                    <Button size="small" color="primary">
                                        Edit
              </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </React.Fragment>
    );
}
export default GamesCard