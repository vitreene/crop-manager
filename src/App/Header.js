import React from 'react';
import logo from './UI/crop-manager-logo4.svg';

export default function Header() {
    return (
        <div className="App-header">
            <img src={logo} className="App-logo" alt="crop-manager"/>
            <nav className="App-header-nav">
                <a 
                href={'http://vitreene.com/articles/crop-manager-presntation/'}>Présentation</a>
                <a  href={'https://github.com/vitreene/crop-manager'}>GitHub</a>
                <a href={'http://vitreene.com/a-propos/'}>Á propos</a>

                </nav> 
      </div>
    )
}