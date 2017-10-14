import React from 'react';
import ReactDOM from 'react-dom';
//import TaskSingle from './task-single';
import { BrowserRouter, Switch, Route, Link, Redirect, withRouter, match } from 'react-router-dom';
import { createTask, getTodoList, markComplete, markActive, deleteTask, getSingleTask } from './models/taskApi.js';

import Nav from './components/Nav';
import ToDo from './pages/ToDo';

import './index.css';

const Task = (props) =>{
  const { state, onChange } = props;
  const { todo, singleID } = state;
  const singleTask = todo.find(task => {
    return task.id == singleID;
  });
  const createdDateObj = new Date(singleTask.created_at);
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  const createdDate = createdDateObj.getHours()%12 +':'+ createdDateObj.getMinutes() + (createdDateObj.getHours() > 12 ? 'PM' : 'PM') +' '+ monthNames[createdDateObj.getMonth()] + ' ' + createdDateObj.getFullYear();
  const isCompleteClass = singleTask.completed ? 'complete' : 'incomplete';

  return(
    <div className="single-wrapper">
      <div className={'single ' + isCompleteClass}>
        <input type="checkbox" checked={singleTask.completed} value={singleTask.id} id={"list_"+singleTask.id} onChange={ () => onChange(singleTask.id, singleTask.completed)}  />
        <label htmlFor={"list_"+singleTask.id}>
          {singleTask.content}
        </label>
      </div>
      <div className="single-footer">
        <p className="meta id">{singleTask.id}</p>
        <p className="meta created">{createdDate}</p>
      </div>
    </div>
  );
}

class TaskPage extends React.Component{
  constructor(props) {
    super(props);
    this.state= {
      singleID: props.match.params.id,
      todo: [],
      loading: true,
    }
  }

  componentWillMount() {
    getTodoList()
    .then((data) => {
      this.setState({todo: data.tasks, loading:false});
    })
    .catch((error) => { console.error(error) });
  }

  handleCheck = (id, complete) => {
    const updateTask = (data) => {
      const { task } = data;
      this.setState({
        todo: this.state.todo.map((t) => {
          if (t.id === task.id) {
            return task;
          }
          return t;
        })
      })
    };

    if (!complete) {
      markComplete(id)
      .then(updateTask);
    } else {
      markActive(id)
      .then(updateTask);
    }
  }

  render(){
    if (this.state.loading) {
      return false;
    } else {
      return(
        <div className={"todo_wrapper page single-page"}>
          <Link className="backLink" to="/">Back</Link>
          <Task state={this.state} onChange={this.handleCheck} />
        </div>
      );
    }
  }
}

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
      <Nav isLoggedIn={this.state.isLoggedIn} onClick={this.toggleLogIn}/>
      <Switch>
        <Route exact path='/' component={ToDo} />
        <Route path='/task/:id' component={TaskPage} />
      </Switch>
    </main>
  );
  }
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
