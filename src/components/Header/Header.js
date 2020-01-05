import React from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import indigo from '@material-ui/core/colors/indigo'

const useStyles = makeStyles(theme => ({
    content: {
        padding: theme.spacing(8, 0, 6),
        marginTop: theme.spacing(2),
        backgroundImage: `url("https://images.unsplash.com/photo-1538895194639-f50554a2ca24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
}));



const Header = props => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.content} style={props.style} alt="Photo by Aleks Dorohovich on Unsplash">
                <Container maxWidth="sm">
                    <Typography
                        component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        GameDB
          </Typography >
                </Container>
            </div>
        
        </React.Fragment>

    );
}
export default Header;