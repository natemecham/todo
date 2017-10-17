import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Nav from './components/Nav';
import ToDo from './pages/ToDo';
import TaskPage from './pages/TaskPage';

import './index.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
    }
  }

  toggleLogIn = () => {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn
    });
  }

  render(){
  return(
    <main>
      
      <Switch>
        <Route exact path='/' component={ToDo} />
        <Route path='/task/:id' component={TaskPage} />
      </Switch>
    </main>
  );
  }
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
