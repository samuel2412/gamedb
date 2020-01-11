import React from 'react';

import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles(theme => ({
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

const Actions = props => {
    const classes = useStyles();

    return(
        <CardActions disableSpacing>
        <IconButton aria-label="add to favorites"
            onClick={props.handleFavoriteClick}
            aria-expanded={props.favorite}
            style={props.favorite ? {color:'red'}: null}
            >
            <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
            <ShareIcon />
        </IconButton>
        <IconButton
            className={clsx(classes.expand, {
                [classes.expandOpen]: props.expanded,
            })}
            onClick={props.handleExpandClick}
            aria-expanded={props.expanded}
            aria-label="show more"
        >
            <ExpandMoreIcon />
        </IconButton>
    </CardActions>
    );
}
export default Actions;