import React, { useState, useEffect } from 'react';
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
 

    useEffect(() => {
        fetchDetail();
    }, []);

    const fetchDetail = () => {
        axios.get(`https://api.rawg.io/api/games/${game.id}`, {
            headers: {
                "User-Agent": "GameDB"
            }
        })
            .then((response) => {
                setGame(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }



    return (
        <React.Fragment>
             
        
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
                           <Typography variant="body2" color="textSecondary" component="p">
                               {showDetail 
                               ?  <div dangerouslySetInnerHTML={{ __html: game.description }} ></div>
                               : null}
                           </Typography>
                       </CardContent>
                       <CardActions>
                           <Container align="center">
                               <Button onClick={() => setShowDetail(!showDetail) } size="small" color="secondary">
                                   {showDetail ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                               </Button>
                           </Container>
                       </CardActions>
       
                   </Card>
    
               </React.Fragment>
    );
}
export default GameCard