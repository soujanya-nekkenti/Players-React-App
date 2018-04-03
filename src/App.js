import React, { Component } from 'react';
import Home from './home.js';
import Update from './update.js';
import AddPlayer from './AddPlayer.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
 
export default class App extends Component {
   constructor(props) {
      super(props);
    
    this.state= {
      targateId:'',
      targateName:'',
      userList:[]
    }

  }
    
  render() { 
    return(
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/Update/:id' component={Update} />
          <Route exact path='/AddPlayer' component={AddPlayer} />
        </Switch>
      </Router>
    )
  } 
}
