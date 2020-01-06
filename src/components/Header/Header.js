import React from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    content: {
        padding: theme.spacing(6, 0, 4),
        marginTop: theme.spacing(2),
        width: '100%',
        color: '#FFFFFF'
    },
}));



const Header = props => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.content}>
                <Container maxWidth="sm">
                    <Typography
                        component="h1" variant="h2" align="center" gutterBottom>
                        GameDB
          </Typography >
                </Container>
            </div>
        
        </React.Fragment>

    );
}
export default Header;