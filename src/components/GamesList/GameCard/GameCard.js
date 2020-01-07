import React, { useState } from 'react';

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
    const game = props.game;
    const [showDetail, setShowDetail] = useState(false);

    return (
        <React.Fragment>


            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={game.background_image || null}
                    title={game.slug}
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {game.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {showDetail
                            ? <span dangerouslySetInnerHTML={{ __html: game.description }} ></span>
                            : null}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Container align="center">
                        <Button onClick={() => setShowDetail(!showDetail)} size="small" color="secondary">
                            {showDetail ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </Button>
                    </Container>
                </CardActions>

            </Card>

        </React.Fragment>
    );
}


export default GameCard;