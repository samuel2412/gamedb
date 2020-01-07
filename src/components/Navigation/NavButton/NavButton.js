import React,{useState} from 'react';

import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
    navLink: {
        textDecoration: 'none',
    },
  
}));

const NavButton = props => {
    const classes = useStyles();
    const [isLogClicked, setIsLogClicked] = useState(false)

    return (
        <NavLink className={classes.navLink}
            isActive={(match) => {
                if (match) {
                    setIsLogClicked(true)
                } else {
                    setIsLogClicked(false)
                }
            }}
            className={classes.navLink}
            exact to={props.link}>
            <Button color="secondary"
                variant={isLogClicked ? 'contained' : 'outlined'}
            >
                {props.label}
            </Button>
        </NavLink>
    );
}
export default NavButton;