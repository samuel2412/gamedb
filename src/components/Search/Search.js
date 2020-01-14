import React, { useState, useRef, useEffect } from 'react';

import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles(theme => ({

    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        color: theme.palette.common.white,
        backgroundColor: fade(theme.palette.common.black, 0.60),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.65),
        },
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: '15vw',
            marginRight: '15vw',
            width: 'auto',
        },
       
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },

}));

const Search = props => {
    const classes = useStyles();

    const { onFilter } = props;
    const [enteredFilter, setEnteredFilter] = useState('');
    const inputRef = useRef();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (enteredFilter === inputRef.current.value) {
                const query = enteredFilter.length === 0 ? undefined : `https://api.rawg.io/api/games?page=1&page_size=6&search="${enteredFilter}"`;
                onFilter(query);
            }
        }, 500)

        return () => {
            clearTimeout(timer)
        };

    }, [enteredFilter, onFilter]);



    return (
        <React.Fragment>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    fullWidth
                    inputProps={{ 'aria-label': 'search' }}
                    value={enteredFilter}
                    inputRef={inputRef}
                    onChange={event => setEnteredFilter(event.target.value)}
                />
            </div>
            
        </React.Fragment>

    );
}

export default Search;