import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const TodoListItem = (props) => {
	const {isComplete,id,onChange,text,handleDropDown,isMenuOpen,onDelete} = props;
	const isCompleteClass = isComplete ? 'complete' : 'incomplete';
	const isMenuOpenClass = isMenuOpen ? 'open' : 'closed';
	
	return(<li className={ isCompleteClass + ' todo_item'}>	
				
				<input type="checkbox" checked={isComplete} value={id} id={"list_"+id} onChange={onChange}/>
				<label for={"list_"+id}>
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
				list.filter((data) => {
				switch (show){
					case 'all':
						return true;
					case 'active':
						return !data.isComplete;
					case 'complete':
						return data.isComplete;
					default:
						return false;
				}
			}).map((data,index) => {
				return <TodoListItem key={index} id={index} text={data.text} isComplete={data.isComplete} onChange={ () => onChange(index)} handleDropDown={() => handleDropDown(index) } isMenuOpen={data.isMenuOpen} onDelete={ () => onDelete(index)} />;
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
		return sum + (!todo.isComplete ? 1 : 0);
	},0);
	
	const completeTodoCount = todo.reduce( (sum,todo ) => {
		return sum + (todo.isComplete ? 1 : 0);
	},0);
	
	const allTodoCount = todo.length;
	
	
	return(
		<div className="toggle">
			<button className={props.show === 'all' ? ' on ' : ''} onClick={() => onClick('all')}>All <span>{allTodoCount}</span></button>
			<button className={props.show === 'active' ? ' on ' : ''} onClick={() => onClick('active')}>Active <span>{activeTodoCount}</span></button>
			<button className={props.show === 'complete' ? ' on ' : ''} onClick={() => onClick('complete')}>Complete <span>{completeTodoCount}</span></button>
			<button className="clear" onClick={onClearClick}>Clear Complete</button>
			
		</div>	
	);
}

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			input: '',
			todo: new Array(0),
			show:'all',	
		}
		
		//this.handleChange = this.handleChange.bind(this);
		//this.handleSubmit = this.handleSubmit.bind(this);
		//this.handleCheck = this.handleCheck.bind(this);
		//this.handleClearClick = this.handleClearClick.bind(this);
		
	}
	
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
			
			
			todo_list[todo_list.length] = {
				text: add_value,
				isComplete: false,
				isMenuOpen:false
			};
			this.setState({todo:todo_list});
		}
	}
	
	handleCheck = (i) => {
		const new_todo = this.state.todo.slice();
		new_todo[i].isComplete = !new_todo[i].isComplete;
		this.setState({todo:new_todo});
	}
	
	handleShow = (i) => {
		this.setState({show:i});
	}
	
	handleClearClick = () => {
		const new_todo = this.state.todo.slice();
		const cleared_complete = new_todo.filter(todo => !todo.isComplete);
		
		this.setState({todo:cleared_complete});
	}
	
	handleDropDown = (i) => {
		const new_todo = this.state.todo.slice();
		new_todo[i].isMenuOpen = !new_todo[i].isMenuOpen;
		this.setState({todo:new_todo});
	}
	
	handleDelete = (i) => {
		const new_todo = this.state.todo.slice();
		new_todo.splice(i,1);
		this.setState({todo:new_todo});

	}
	
	render(){
		return(
			<div className="todo_wrapper">
				<Input input={this.state.input} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
				<TodoList list={this.state.todo} show={this.state.show} onChange={(i)=>this.handleCheck(i)} handleDropDown={(i)=>this.handleDropDown(i)} onDelete={(i) => this.handleDelete(i)}/>
				<Toggle	onClick={(i) => this.handleShow(i)} show={this.state.show} onClearClick={this.handleClearClick} todo={this.state.todo}/>
			</div>
		);	
	}
	
}





ReactDOM.render(<App />, document.getElementById('root'));
