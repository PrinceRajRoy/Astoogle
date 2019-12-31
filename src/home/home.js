import React from 'react';
import './home.css';
import Nav from '../nav/nav';

class home extends React.Component {
  
  render() {
        return (
            <div id="home">
                <Nav path={'/'}/>
                <span id="welcome">
                    Welcome To Astoogle<br /><span>A search engine for Near Earth Objects!</span>
                </span>
            </div>
        );
    }
}

export default home;
