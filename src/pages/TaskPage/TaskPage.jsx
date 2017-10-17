import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  markComplete,
  markActive,
  deleteTask,
  getSingleTask
} from '../../models/taskApi.js';

import Task from './Task';

class TaskPage extends React.Component{
  constructor(props) {
    super(props);
    this.state= {
      singleID: props.match.params.id,
      singleTask: [],
      redirect: false,
      loading: true,
    }
  }

  componentWillMount() {
    getSingleTask(this.state.singleID)
    .then((task) => {
      console.dir(task);
      this.setState({singleTask: task, loading:false});
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
  
  handleDelete = (id, index) => {
    const new_todo = this.state.todo.slice();
    deleteTask(id)
    .then((response) => {
      if (response.success) {
        new_todo.splice(index, 1);
        this.setState({ todo: new_todo });
      }
    })
  }
  
  handleDelete = (id, index) => {
    deleteTask(id)
    .then((response) => {
      if (response.success) {
        this.setState({redirect:true});
      }
    })
  }
  
  render(){
    if(this.state.redirect){
      return(
        <Redirect to="/" />
      );
    }
    if (this.state.loading) {
      return false;
    } else {
      return(
        <div className={"todo_wrapper page single-page"}>
          <Link className="backLink" to="/">Back</Link>
          <Task theTask={this.state.singleTask} onChange={this.handleCheck} onDelete={this.handleDelete}/>
        </div>
      );
    }
  }
}

export default TaskPage;