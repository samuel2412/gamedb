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
    const [showDetail, setShowDetail] = useState(false);
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
        </CardContent>
    );

    const cardActions = (
        <CardActions>
            <Container align="center">
                <Button onClick={() => fetchDetail()} size="small" color="secondary">
                    {showDetail ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </Button>
            </Container>
        </CardActions>
    );

    return (
        <React.Fragment>


            <Card className={classes.card}>

                {cardMedia}

                {cardContent}

                {cardActions}

            </Card>

        </React.Fragment>
    );
}


export default GameCard;