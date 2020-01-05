import React from 'react'

import SideDrawer from './SideDrawer/SideDrawer';

import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography';



const Navbar = props => {
   
    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>
                        <SideDrawer />
                    <Typography variant="h6" color="inherit" noWrap>
                        GameDB
                    </Typography>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}
export default Navbar;