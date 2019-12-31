import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

class Nav extends React.Component {

  render() {
    return (
          <div id="nav">
            <div id="logo">
              <img className="img-responsive" src={require("../images/logo.PNG")} alt="logo"></img>
            </div>
            <ul id="mobile" className="nav-item dropdown">
              <span className="nav-link" id="navbarDropdown" role="button" data-toggle="dropdown">
                <img className="img-responsive" src={require("../images/ham.png")} alt="logo"></img>
              </span>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li className="dropdown-item" style={this.props.path === '/' ? {display: 'none'} : {display: 'inline-block'}}><Link to='/'>Home</Link>
                <div className="dropdown-divider"></div></li>
                <li className="dropdown-item" style={this.props.path === '/browse' ? {display: 'none'} : {display: 'inline-block'}}><Link to='/browse'>Neo Browse</Link>
                <div className="dropdown-divider"></div></li>
                <li className="dropdown-item" style={this.props.path === '/dateS' ? {display: 'none'} : {display: 'inline-block'}}><Link to='/dateS'>Date Search</Link>
                <div className="dropdown-divider"></div></li>
                <li className="dropdown-item" style={this.props.path === '/idS' ? {display: 'none'} : {display: 'inline-block'}}><Link to='/idS'>ID Search</Link></li>
              </div>
            </ul>
            <ul id="desktop" className="text-center">
              <li style={this.props.path === '/' ? {display: 'none'} : {display: 'inline-block'}}><Link to='/'>Home</Link></li>
              <li style={this.props.path === '/browse' ? {display: 'none'} : {display: 'inline-block'}}><Link to='/browse'>Neo Browse</Link></li>
              <li style={this.props.path === '/dateS' ? {display: 'none'} : {display: 'inline-block'}}><Link to='/dateS'>Date Search</Link></li>
              <li style={this.props.path === '/idS' ? {display: 'none'} : {display: 'inline-block'}}><Link to='/idS'>ID Search</Link></li>
            </ul>
          </div>
    );
  }
}

export default Nav;
