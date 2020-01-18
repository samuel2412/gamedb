import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DoneIcon from '@material-ui/icons/Done';
import pink from '@material-ui/core/colors/pink';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
        margin: theme.spacing(3),
        textAlign: "left",
        [theme.breakpoints.up('sm')]: {
            textAlign: "center",
        },
    },
    gamesData: {
        display: 'flex',
        flexDirection: "column",
        margin: 'auto',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            flexDirection: "column",
            width: 'auto'
        },
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
        marginRight: theme.spacing(2),
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
    const {userName,avatarUrl, likes, completeds,fetchLikes, fetchCompleted,fetchUserAdicionalData } = props;
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
      
            fetchLikes(null,  props.match.params.userId);
            fetchCompleted(null,  props.match.params.userId);
            fetchUserAdicionalData(null, props.match.params.userId);
        
    }, [props.match.params.userId, fetchLikes, fetchCompleted])
 

    //console.log(likes)
    //console.log(completeds)

    const userData = (
        <div className={classes.userData}>
            <Avatar alt="Avatar"
                src={avatarUrl}
                className={classes.avatar} />
            <Typography variant="subtitle1" color="textPrimary" component="p" gutterBottom>
                {userName}
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
    );


    const content = (
        value === 0 ?
            <>
                <div className={classes.innerConteiner}>
                    {likes.map(like => (
                        <Link to={`/game/${like.id}`} key={like.id} style={{ textDecoration: 'none' }}>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {like.gameName}
                            </Typography>
                        </Link>
                    ))}
                </div>
            </>
            :
            <>
                <div className={classes.innerConteiner}>
                    {completeds.map(completed => (
                        <Link to={`/game/${completed.id}`} key={completed.id} style={{ textDecoration: 'none' }}>
                            <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                                {completed.gameName}
                            </Typography>
                        </Link>
                    ))}
                </div>
            </>

    );

    const gamesData = (
        <div className={classes.gamesData}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
                aria-label="icon label tabs example"
            >
                <Tab icon={<FavoriteIcon style={{ color: 'red' }} />} label="Liked" />
                <Tab icon={<DoneIcon style={{ color: 'blue' }} />} label="Completed" />
            </Tabs>

            {content}

        </div>
    );


    return (
        <Container align='center' className={classes.root}>
            {userData}
            {gamesData}

        </Container>
    );
}

const mapStateToProps = state => {
    return {
        likes: state.likesReducer.likes,
        completeds: state.completedReducer.completeds,
        avatarUrl: state.authReducer.avatarUrl,
        userName: state.authReducer.userName,
    };
}


const mapDispatchToProps = dispatch => {
    return {
        fetchLikes: (token, userId) =>
            dispatch(actions.fetchLikes(token, userId)),

        fetchCompleted: (token, userId) =>
            dispatch(actions.fetchCompleted(token, userId)),

        fetchUserAdicionalData: (token,userId) =>
            dispatch(actions.fetchUserAdicionalData(token,userId))

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
