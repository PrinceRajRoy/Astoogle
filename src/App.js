import React from 'react';
import './App.css';
//import Nav from './nav/nav';
import home from './home/home';
import browse from './search/browse/browse';
import dateSearch from './search/dateSearch/dateSearch';
import idSearch from './search/idSearch/idSearch';
import {Route, Redirect, Switch} from 'react-router-dom';

class App extends React.Component {

  render() {
    return (
        <div className="App">
          <Switch>
              <Route path='/' exact strict component={home}/>
              <Route path='/browse' exact strict component={browse}></Route>
              <Route path='/idS' exact strict component={idSearch}/>
              <Route path='/dateS' exact strict component={dateSearch}/>
              <Redirect from='*' to='/'/>
          </Switch>
        </div>
      );
    }
}

export default App;
