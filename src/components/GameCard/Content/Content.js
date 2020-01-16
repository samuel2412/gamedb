import React from 'react';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider'



const useStyles = makeStyles(theme => ({
    cardContent: {
        flexGrow: 1,
    }
}));

const Content = props => {
    const classes = useStyles();

    const detail = (
        <>
            <Divider variant="middle" />

            <Typography variant="body2" color="textSecondary" component="p">
                <span dangerouslySetInnerHTML={{ __html: props.description }} ></span>
            </Typography>

            <Divider variant="middle" />

            {props.children}
        </>

    );

    return (

        <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
                {props.name}
            </Typography>

            {props.isDetail ? detail : null}


        </CardContent>

    );

}
export default Content