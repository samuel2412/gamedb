import React from 'react';

import Media from './Media/Media';
import Content from './Content/Content';
import Actions from './Actions/Actions';

import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    }
}));

const GameCard = props => {
    const classes = useStyles();
    const { isDetail, game,likedByUser,completedByUser  } = props;

    /*   const fetchGameDetail = () => {
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
      const handleExpandClick = () => {
          if (!game.description) {
              fetchGameDetail();
          }
          setExpanded(!expanded);
      }; */

    const handleFavoriteClick = () => {
        if (!likedByUser) {
            props.likeGame({ userId: props.userId, gameId: game.id }, props.token);
        } else {
            //console.log(likedByUser)
            props.dislikeGame({ userId: props.userId, id: likedByUser.id }, props.token);
        }
    }
    const handleCompletedClick = () => {
        if (!completedByUser) {
            props.completedGame({ userId: props.userId, gameId: game.id }, props.token);
        } else {
            //console.log(likedByUser)
            props.uncompletedGame({ userId: props.userId, id: completedByUser.id }, props.token);
        }
    }
    return (
        <React.Fragment>



            <Card className={classes.card}>

                <Media image={game.background_image} />

                <Content
                    isDetail={isDetail}
                    name={game.name}
                    description={game.description}
                    children={props.children}
                />

                <Actions
                    isDetail={isDetail}
                    gameId={game.id}
                    handleFavoriteClick={handleFavoriteClick}
                    handleDoneClick={handleCompletedClick}
                    done={completedByUser}
                    favorite={likedByUser}
                    isAuth={props.isAuth}
                />

            </Card>


        </React.Fragment>
    );
}

export default GameCard;