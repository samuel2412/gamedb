import React, { useState } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


const useStyles = makeStyles(theme => ({
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

const GameCard = props => {
    const classes = useStyles();
    const [game, setGame] = useState(props.game);
    const [showDetail, setShowDetail] = useState(props.children);
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
    const fetchDetail = () => {
        if (!game.description) {
            fetchGameDetail();
        }
        setShowDetail(!showDetail);
    }

    const cardMedia = (
        <CardMedia
            className={classes.cardMedia}
            image={game.background_image || null}
            title={game.slug}
        />
    );

    const cardContent = (
        <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
                {game.name}
            </Typography>

            {isLoading
                ? <LinearProgress color="secondary" />
                : null}

            <Typography variant="body2" color="textSecondary" component="p">
                {showDetail
                    ? <span dangerouslySetInnerHTML={{ __html: game.description }} ></span>
                    : null}
            </Typography>
            <Container align='center' >
            {props.isAuth ?
                <Button size="small" color="secondary">
                     <FavoriteIcon />
                </Button>
            : null }
             {props.isAuth ?
                <Button size="small" color="secondary">
                     <CheckCircleIcon />
                </Button>
            : null }
            </Container>
        </CardContent>
    );



    const cardActions = (
        <CardActions>
            <Container align='center' >

                {props.children ? null :
                    <Button onClick={() => fetchDetail()} size="small" color="secondary">
                        {showDetail ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </Button>
                }
            </Container>
        </CardActions>
    );

    return (
        <React.Fragment>

            <Grid item xs={12} >

                <Card className={classes.card}>

                    {cardMedia}

                    {cardContent}

                    {cardActions}

                </Card>
            </Grid>

        </React.Fragment>
    );
}


export default GameCard;