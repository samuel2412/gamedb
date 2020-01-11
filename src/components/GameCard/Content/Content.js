import React from 'react';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({   
    cardContent: {
        flexGrow: 1,
    },
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

const Content = props => {
    const classes = useStyles();

   return (

        <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
                {props.name}
            </Typography>
            <Collapse in={props.expanded} timeout="auto" unmountOnExit>

                {props.isLoading
                    ? <LinearProgress color="secondary" />
                    : null}

                <Typography variant="body2" color="textSecondary" component="p">
                    <span dangerouslySetInnerHTML={{ __html: props.description }} ></span>
                </Typography>
            </Collapse>
        </CardContent>

    );

}
export default Content