import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
import {corsRequest, handleErrors} from './utilities/fetchHelpers.js';
import {createTask,getTodoList,markComplete,markActive,deleteTask} from './models/taskApi.js';
import './index.css'; 

const api_key = '22';

const TodoListItem = (props) => {
  const {isComplete,id,onChange,text,handleDropDown,isMenuOpen,onDelete} = props;
  const isCompleteClass = isComplete ? 'complete' : 'incomplete';
  const isMenuOpenClass = isMenuOpen ? 'open' : 'closed';

  return(
    <li className={ isCompleteClass + ' todo_item'}>          
      <input type="checkbox" checked={isComplete} value={id} id={"list_"+id} onChange={onChange}/>
      <label htmlFor={"list_"+id}>
        {text}
      </label>
      <div className={isMenuOpenClass + ' drop_down'}>
        <button className="toggle_drop"  onClick={handleDropDown}></button>
        <div className="menu">
          <button onClick={onDelete} className="delete btn">Delete</button>
        </div>
      </div>
    </li>
  );
}//end TodoListItem

const TodoList = (props) => {
  const {list,onChange,show,handleDropDown,onDelete} = props;       
  return(
    <ul>
      {
        list.sort(
          (a,b) => {
            const aDate = new Date(a.created_at);
            const bDate = new Date(b.created_at);
            return aDate - bDate;
          }
        ).filter((data) => {
        switch (show){
          case 'all':
            return true;
          case 'active':
            return !data.completed;
          case 'complete':
            return data.completed;
          default:
            return false;
        }
      }).map((data,index) => {
        return <TodoListItem key={index} id={data.id} text={data.content} isComplete={data.completed} onChange={ () => onChange(data.id, data.completed)} handleDropDown={() => handleDropDown(index) } isMenuOpen={data.isMenuOpen} onDelete={ () => onDelete(data.id)} />;
        })
      }
    </ul>);
}//end TodoList

const Input = (props) => {
  const {handleSubmit,input,handleChange} = props;
  return(
    <div className="form_wrapper" onSubmit={handleSubmit}>
      <form name="new_todo">
        <input placeholder="What do you need to do?" type="text" value={input} onChange={handleChange} />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}

function Toggle(props){
  const {todo, onClick, onClearClick} = props;
  const activeTodoCount = todo.reduce( (sum,todo ) => {
  return sum + (!todo.completed ? 1 : 0);
  },0);

  const completeTodoCount = todo.reduce( (sum,todo ) => {
    return sum + (todo.completed ? 1 : 0);
  },0);

  const allTodoCount = todo.length;
  
  
  return(
    <div className="toggle">
      <button className={props.show === 'all' ? ' on ' : ''} onClick={() => onClick('all')}>All <span>{allTodoCount}</span></button>
      <button className={props.show === 'active' ? ' on ' : ''} onClick={() => onClick('active')}>Active <span>{activeTodoCount}</span></button>
      <button className={props.show === 'complete' ? ' on ' : ''} onClick={() => onClick('complete')}>Complete <span>{completeTodoCount}</span></button>
      <button className="clear" onClick={onClearClick}>Clear Complete</button>
      <sub>v2</sub>
    </div>  
  );
}

class ToDo extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      input: '',
      todo: new Array(0),
      show:'all',  
    }    
  }  
  
  componentDidMount() {
    getTodoList(this);
  }//end componentDidMount
  
  handleChange = (e) => {
    this.setState({input: e.target.value});
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const input = this.state.input;
    if(input){
      const add_value = input;
      this.setState({input: ''});
      
      const todo_list = this.state.todo.slice();
      createTask(add_value, this);
    }
  }//end handleSubmit
  
  handleCheck = (id,complete) => {
    if(!complete){
      markComplete(id, this);
    }else{
      markActive(id,this);
    }
  }
  
  handleShow = (i) => {
    this.setState({show:i});
  }
  
  handleClearClick = () => {
    console.log('clear clicked');
    const new_todo = this.state.todo.slice();
    const marked_complete = new_todo.filter(todo => todo.completed);
    
    console.dir(marked_complete);
    
    marked_complete.forEach((el) => {
      deleteTask(el.id,this);
    });
  }
  
  handleDropDown = (i) => {
    const new_todo = this.state.todo.slice();
    new_todo[i].isMenuOpen = !new_todo[i].isMenuOpen;
    this.setState({todo:new_todo});
  }
  
  handleDelete = (i) => {
    deleteTask(i,this);
  }
  
  render(){
    return(
      <div className="todo_wrapper page" >
      
        <Input input={this.state.input} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
        <TodoList list={this.state.todo} show={this.state.show} onChange={(i,v)=>this.handleCheck(i,v)} handleDropDown={(i)=>this.handleDropDown(i)} onDelete={(i) => this.handleDelete(i)}/>
        <Toggle  onClick={(i) => this.handleShow(i)} show={this.state.show} onClearClick={this.handleClearClick} todo={this.state.todo}/>  
      </div>
    );  
  }
  
}

const Nav = (props) => {
  const {isLoggedIn,onClick} = props;
  return(
    <nav>
      <button onClick={onClick} className="login">{isLoggedIn ? 'Log Out' : 'Log In'}</button>
      <Link className="" to="/">Home</Link>
      <Link className="" to="/page2">Page2</Link>
      <Link className="" to="/page3">Page3</Link>
    </nav>  
  );
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
        <Route path='/page2' component={Page2} />
        <Route exact path='/page3' component={Page3} />
        <Route path='/page3/:number' component={Page3} />
      </Switch>
    </main>
  );
  }
}//End App

const Page2 = (props) => {
  return(
    <div className="page">
      <h1>This is page two!!</h1>
    </div>
  );
}

const Page3 = (props) => {
  const param = props.match.params.number;
  //console.dir(props);
  let onPage = null;
  if(param){
    onPage = param;
  }else{
    onPage = 'Page 3 Root';
  }
  return(
    <div className="page">
      <h2>Here is page 3: {onPage}</h2>
      <ul>
        <li className={param === '1' ? 'complete' : ''} ><Link  to="/page3/1">Page3:1</Link></li>
        <li  className={param === '2' ? 'complete' : ''}><Link to="/page3/2">Page3:2</Link></li>
        <li className={param === '3' ? 'complete' : ''}><Link  to="/page3/3">Page3:3</Link></li>
        <li className={param === '4' ? 'complete' : ''}><Link  to="/page3/4">Page3:4</Link></li>
      </ul>
    </div>
  );
}


ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
