import React from 'react';
import {
  createTask,
  getTodoList,
  markComplete,
  markActive,
  deleteTask
} from '../../models/taskApi.js';

import Input from './Input';
import Toggle from './Toggle';
import ToDoList from './ToDoList';

class ToDo extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      input: '',
      input_error:false,
      todo: [],
      show: 'all',
      loading: true,
    }
  }

  componentDidMount() {
    getTodoList()
    .then((data) => {
      this.setState({todo: data.tasks, loading:false});
    })
    .catch((error) => { console.error(error) });
  }

  handleChange = (e) => {
    if(e.target.value.length > 200){
      this.setState({input_error:true});
    }else{
       this.setState({input_error:false});
    }
    this.setState({input: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const input = this.state.input;
    if (input && input.length < 200) {
      this.setState({input_error:false});
      createTask(input)
      .then((data) => {
        this.setState({
          todo: [data.task, ...this.state.todo],
          input: '',
        })
      })
    } else{
        this.setState({input_error:true});
    }
    
  }

  // Better to keep this here, this function is small enough that rewriting it isn't a problem
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

  handleShow = (i) => {
    this.setState({ show: i });
  }

  handleClearClick = () => {
    console.log('clear clicked');
    const new_todo = this.state.todo.slice();
    const marked_complete = new_todo.filter(todo => todo.completed);

    console.dir(marked_complete);

    const promises = [];

    marked_complete.forEach((el) => {
      promises.push(deleteTask(el.id)
        .then((response) => {
          if (response.success) {
            new_todo.splice(new_todo.indexOf(el), 1);
          }
          return Promise.resolve();
        })
      );
    });

    Promise.all(promises)
    .then(() => {
      this.setState({ todo: new_todo });
    })
  }

  handleDropDown = (i) => {
    const new_todo = this.state.todo.slice();
    new_todo[i].isMenuOpen = !new_todo[i].isMenuOpen;
    this.setState({todo:new_todo});
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

  render(){
    const loading = this.state.loading ? 'loading' : '';
    return(
      <div className={"todo_wrapper page " + loading } >
        <Input
          input={this.state.input}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          error={this.state.input_error}
        />
        <ToDoList
          list={this.state.todo}
          show={this.state.show}
          onChange={this.handleCheck}
          handleDropDown={this.handleDropDown}
          onDelete={this.handleDelete}
        />
        <Toggle
          onClick={this.handleShow}
          show={this.state.show}
          onClearClick={this.handleClearClick}
          todo={this.state.todo}
        />
      </div>
    );
  }
}

export default ToDo;
