import * as React from 'react';

import Footer from "./footer/Footer";
import Header from "./header/Header";

import './App.css';

class App extends React.Component {
    public render() {
        return (
            <div>
                <Header/>
                <Footer/>
            </div>
        );
    }
}

export default App;
