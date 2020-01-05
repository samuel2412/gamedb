import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import Navbar from '../Navigation/Navbar/Navbar'
import Footer from '../Navigation/Footer/Footer';


const Layout = props => {
   
   
    return (
        <React.Fragment>
            <CssBaseline />

            <Navbar/>

            <main>
                {props.children}
            </main>

            <Footer />
        </React.Fragment>
    );
}

export default Layout;