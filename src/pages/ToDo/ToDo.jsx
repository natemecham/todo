import React from 'react';
import {
  createTask,
  editTask,
  getTodoList,
  markComplete,
  markActive,
  deleteTask
} from '../../models/taskApi.js';

import {formatDate} from '../../utilities/dateFunctions.js';

import Input from './Input';
import Toggle from './Toggle';
import TaskList from './TaskList';



class ToDo extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      today:formatDate(),
      content: '',
      input_error:false,
      due:formatDate(),
      todo: [],
      show: 'all',
      loading: true,
      showMenu: false,
      showClear: false,
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
    this.setState({content: e.target.value});
  }
  
  handleDateChange = (e) => {
    this.setState({due: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const input = this.state.content;
    const due = this.state.due;
    console.log(due);
    if (input && input.length < 200 && due) {
      this.setState({input_error:false});
      createTask(input,due)
      .then((data) => {
        this.setState({
          todo: [data.task, ...this.state.todo],
          content: '',
          due: formatDate()
        })
      })
    } else{
        this.setState({input_error:true});
    }
  }//handleSubmit
  
  handleUpdate = (e,id,content,due) => {
    e.preventDefault();
    editTask(id,content,due)
    .then((data)=>{
      getTodoList().then((data) =>{
        this.setState({todo:data.tasks});
      });
  
    })
  }//handleUpdate
  
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
      .then(updateTask)
    } else {
      markActive(id)
      .then(updateTask);
    }
  }

  handleShow = (i) => {
    this.setState({ 
      show: i, 
      showMenu:false,
      });
  }
  
  toggleMenu = (i) => {
    this.setState({
      showMenu: !this.state.showMenu,
      showClear: false
    })
  }
  
  
  toggleClear = (i) => {
    this.setState({
      showClear: !this.state.showClear,
      showMenu: false
    })
  }
  
  closeMenu = () => {
	  this.setState({
      showClear: false,
      showMenu: false
    })
  }
  

  handleClearClick = () => {
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
      this.setState({ 
        todo: new_todo,
        showClear: false 
        });
    })
  }

  handleDelete = (id, index) => {
    console.log(id);
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
    const loading = this.state.loading ? 'loading' : 'loaded';
    return(
      
      <div className={"todo_wrapper page " + loading} >
        <Input
          content={this.state.content}
          due={this.state.due}
          handleChange={this.handleChange}
          handleDateChange={this.handleDateChange}
          handleSubmit={this.handleSubmit}
          error={this.state.input_error}
        />
        <TaskList
          today={this.state.today}
          list={this.state.todo}
          show={this.state.show}
          onChange={this.handleCheck}
          handleDropDown={this.handleDropDown}
          onDelete={this.handleDelete}
          handleUpdate={this.handleUpdate}
        />
        <Toggle
          onClick={this.handleShow}
          showMenu={this.state.showMenu}
          showClear={this.state.showClear}
          toggleMenu={this.toggleMenu}
          toggleClear={this.toggleClear}
          show={this.state.show}
          onClearClick={this.handleClearClick}
          todo={this.state.todo}
          closeMenu={this.closeMenu}
        />
        <div className="load_wrapper"></div>
      </div>
      
    );
  }
}

export default ToDo;
