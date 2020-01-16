import React from 'react';
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DoneIcon from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';



const useStyles = makeStyles(theme => ({
    button: {
        marginLeft: 'auto',
        textDecoration: 'none',
    },
}));

const Actions = props => {
    const classes = useStyles();

    let requireAuth = (
        <React.Fragment>
            <IconButton aria-label="add to favorites"
                onClick={props.handleFavoriteClick}
                style={props.favorite ? { color: 'red' } : null}
            >
                <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="done"
                onClick={props.handleDoneClick}
                style={props.done ? { color: 'blue' } : null}
            >
                <DoneIcon />
            </IconButton>
        </React.Fragment>
    );
    if (!props.isAuth) {
        requireAuth = (null);
    }


    return (
        <CardActions disableSpacing>

            {requireAuth}

            {props.isDetail ? null :
                <Link to={`/game/${props.gameId}`} className={classes.button}>
                    <Button aria-label="show more">
                        More
                </Button>
                </Link>
            }
        </CardActions>
    );
}
export default Actions;
