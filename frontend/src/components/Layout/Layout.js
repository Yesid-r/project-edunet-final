import React, { Component } from 'react';
import Header from '../header/Header';
import Footer from '../Footer/Footer';
import Routers from '../../router/Routers';

class Layout extends Component {
    render() {
        return <>
        <Header />
        <Routers />
        <Footer />
        </>
    }
}

export default Layout;