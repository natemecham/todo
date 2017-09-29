import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const TodoListItem = (props) => {
	const {isComplete,id,onChange,text} = props;
	const isCompleteClass = isComplete ? 'complete' : 'incomplete';
	
	return(<li className={ isCompleteClass + ' todo_item'}>	
				<input type="checkbox" checked={isComplete} value={id} onChange={onChange}/>
				{text}
			</li>
		);
			
}//end TodoListItem

const TodoList = (props) => {
	const {list,onChange,show} = props;	
			
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
				return <TodoListItem key={index} id={index} text={data.text} isComplete={data.isComplete} onChange={ () => onChange(index)}/>;
				})
			}
		</ul>);
}//end TodoList


const Input = (props) => {
	const {handleSubmit,input,handleChange} = props;
	return(
		<div className="form_wrapper" onSubmit={handleSubmit}>
			<form name="new_todo">
				<input type="text" value={input} onChange={handleChange} />
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
	
	
	return(
		<div className="toggle">
			<button className={props.show === 'all' ? ' on ' : ''} onClick={() => onClick('all')}>All</button>
			<button className={props.show === 'active' ? ' on ' : ''} onClick={() => onClick('active')}>Active</button>
			<button className={props.show === 'complete' ? ' on ' : ''} onClick={() => onClick('complete')}>Complete</button>
			<button onClick={onClearClick}>Clear Complete</button>
			<p>Left To-Do:{activeTodoCount}</p>
		</div>	
	);
}

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			input: '',
			todo: new Array(0),
			show:'all'	
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
		for(let i=new_todo.length - 1; i >= 0 ; i--){
			if(new_todo[i].isComplete){
				new_todo.splice(i,1);
			}
		}
		
		this.setState({todo:new_todo});
	}
	
	render(){
		return(
			<div className="todo_wrapper">
				<h1>Do These Things</h1>
				<Input input={this.state.input} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
				<TodoList list={this.state.todo} show={this.state.show} onChange={(i)=>this.handleCheck(i)}/>
				<Toggle	onClick={(i) => this.handleShow(i)} show={this.state.show} onClearClick={this.handleClearClick} todo={this.state.todo}/>
			</div>
		);	
	}
	
}





ReactDOM.render(<App />, document.getElementById('root'));
