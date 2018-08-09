import * as React from 'react';

import './App.css';
import Footer from "./footer/Footer";
import Header from "./header/Header";

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
