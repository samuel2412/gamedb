import React from 'react';


import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(5),
    },
    innerButtons: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'inline',
        },
    },
}));


const Pagination = props => {
    const classes = useStyles();
    const currentPage = Number(props.currentPage);
    const pagesValues = [];
    const lastPage = Math.ceil(Number(props.gameCount) / 6);

    if (currentPage < 3) {
        pagesValues.push(1, 2, 3, 4, 5)
    }
    else if (currentPage > lastPage - 4) {
        pagesValues.push(lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage);
    } else {
        pagesValues.push(currentPage - 1, currentPage, currentPage + 1, currentPage + 2, currentPage + 3)
    }

    return (
        <React.Fragment>

            <Button variant="contained" color="secondary"
                onClick={() => props.changePageHandler(1)}
                disabled={currentPage === 1}>
                <FirstPageIcon />
            </Button>

            <Button variant="contained"
                color="secondary"
                onClick={() => props.changePageHandler(currentPage - 1)}
                disabled={props.prevPage === null}>
                <NavigateBeforeIcon />
            </Button>

            {pagesValues.map(page => (
                <Button
                    className={classes.innerButtons}
                    key={page}
                    variant={page === currentPage ? "outlined" : "text"}
                    color="secondary"
                    onClick={() => props.changePageHandler(page)}
                    disabled={currentPage === page}>
                    {page}</Button>
            ))}

            <Button variant="contained"
                color="secondary"
                onClick={() => props.changePageHandler(currentPage + 1)}
                disabled={props.nextPage === null}>
                <NavigateNextIcon />
            </Button>

            <Button variant="contained" color="secondary"
                onClick={() => props.changePageHandler(lastPage)}
                disabled={currentPage === lastPage}>
                <LastPageIcon />
            </Button>

        </React.Fragment>
    )
}
export default Pagination;