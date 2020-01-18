import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DoneIcon from '@material-ui/icons/Done';
import Divider from '@material-ui/core/Divider'
import pink from '@material-ui/core/colors/pink';

import * as actions from '../../store/actions/index';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '90%',
        maxHeight: '90%',
        background: '#ffffff',
        padding: theme.spacing(3),
        marginTop: theme.spacing(5),
        borderRadius: '5px',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            flexDirection: "row",
        },

    },
    innerConteiner: {
        display: 'flex',
        flexDirection: "column",
        width: '100%',
        margin: theme.spacing(3),
        textAlign: "left"
    },
    gamesData: {
        display: 'flex',
        flexDirection: "row",
        margin: 'auto',
        maxHeight: '100vh'
    },
    userData: {
        display: 'flex',
        flexDirection: "column",
        padding: theme.spacing(2),
        border: "solid 1px",
        borderColor: pink['A400'],
        width: "100%",
        borderRadius: '5px',
        height: '200px',
        [theme.breakpoints.up('sm')]: {
            width: '200px',
        },
    },
    inlineImg: {
        verticalAlign: 'middle'
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));

const Profile = props => {
    const classes = useStyles();
    const { isAuth, token, userId, fetchLikes, likes, completeds, fetchCompleted } = props;



    useEffect(() => {

        if (isAuth && likes.length === 0) {
            fetchLikes(token, userId)
            fetchCompleted(token, userId)
        }
    }, [isAuth, token, userId, fetchLikes, fetchCompleted, likes])


    //console.log(likes)
    console.log(completeds)


    return (
        <Container align='center' className={classes.root}>
            <div className={classes.userData}>
                <Avatar alt="Avatar"
                    src="https://i.pinimg.com/280x280_RS/77/f9/af/77f9afc9767a1bfada4ec4453a42dff4.jpg"
                    className={classes.avatar} />
                <Typography variant="subtitle1" color="textPrimary" component="p" gutterBottom>
                    user name
        </Typography>

                <Typography variant="body1" color="textSecondary" component="span" >
                    <FavoriteIcon className={classes.inlineImg} style={{ color: 'red' }} />
                    {` ${likes.length}`}
                </Typography>

                <Typography variant="body1" color="textSecondary" component="span" >
                    <DoneIcon className={classes.inlineImg} style={{ color: 'blue' }} />
                    {` ${completeds.length}`}
                </Typography>

            </div>
            <div className={classes.gamesData}>
                <div className={classes.innerConteiner}>
                    <Typography variant="h6" color="textPrimary" component="p">
                        Liked
                </Typography>
                <Divider />
                    {likes.map(like => (
                        <Link to={`/game/${like.id}`} key={like.id} style={{ textDecoration: 'none' }}>
                            <Typography  variant="body2" color="textSecondary" component="p">
                                {like.gameName}
                            </Typography>
                        </Link>
                    ))}
                </div>
                   
                       
                <div className={classes.innerConteiner}>
                    <Typography variant="h6" color="textPrimary" component="p">
                        Completed
                </Typography>
                <Divider />
                    {completeds.map(completed => (
                        <Link to={`/game/${completed.id}`} key={completed.id} style={{ textDecoration: 'none' }}>
                            <Typography  variant="body2" color="textSecondary" component="p" gutterBottom>
                                {completed.gameName}
                            </Typography>
                        </Link>
                    ))}
                </div>
            </div>
        </Container>
    );
}

const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.tokenId !== null,
        token: state.authReducer.tokenId,
        userId: state.authReducer.userId,
        likes: state.likesReducer.likes,
        completeds: state.completedReducer.completeds
    };
}


const mapDispatchToProps = dispatch => {
    return {



        fetchLikes: (token, userId) =>
            dispatch(actions.fetchLikes(token, userId)),

        fetchCompleted: (token, userId) =>
            dispatch(actions.fetchCompleted(token, userId))

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
