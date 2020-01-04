import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import Menu from '../Navigation/Menu/Menu'
import Footer from '../Navigation/Footer/Footer';


const Layout = props => {

    return (
        <React.Fragment>
            <CssBaseline />

            <Menu />
            
            <main>
                {props.children}
            </main>

            <Footer />
        </React.Fragment>
    );
}

export default Layout;