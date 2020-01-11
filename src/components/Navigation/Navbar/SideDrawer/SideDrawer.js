import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import HomeIcon from '@material-ui/icons/Home';
import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    list: {
        width: 250,
    },
    icon: {
        color: "inherit"
    },
}));

const SideDrawer = props => {
    const classes = useStyles();
    const [state, setState] = useState(false);

    const toggleDrawer = (open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState(open);
    };

    const sideList = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <Link to='/' style={{ textDecoration: 'none', color: "inherit" }}>
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </Link>

                <Link to='/' style={{ textDecoration: 'none', color: "inherit" }}>
                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                </Link>

                <Link to= {props.isAuth ? '/logout' : '/authentication' } style={{ textDecoration: 'none', color: "inherit" }}>
                    <ListItem button>
                        <ListItemIcon>
                            {props.isAuth
                                ? <ExitToAppIcon />
                                : <LockIcon />
                            }
                        </ListItemIcon>
                        <ListItemText primary={
                            props.isAuth
                                ? 'Logout'
                                : 'Login'
                        }
                        />
                    </ListItem>
                </Link>

            </List>
        </div>
    );
    return (
        <div>
            <IconButton onClick={toggleDrawer(true)} className={classes.icon}>
                <MenuIcon />
            </IconButton>
            <Drawer open={state} onClose={toggleDrawer(false)}>
                {sideList()}
            </Drawer>
        </div>
    );
}

export default SideDrawer;