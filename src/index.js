import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function TodoListItem(props){
	const isComplete = props.isComplete ? 'complete' : 'incomplete';
	const i = props.id;
	let list_item = null;
	
	list_item = <li className={ isComplete + ' todo_item'}>
				
				<input type="checkbox" checked={props.isComplete} value={i} onChange={props.onChange}/>
				{props.text}
			
			</li>;
			
	return(list_item);
			
}//end TodoListItem

function TodoList(props){
	
	const list = props.list;
	const onChange = props.onChange;
	const show = props.show;
	const todo_list = list.map((data, index) => {
				if(show === -1 || show == data.isComplete){
				return <TodoListItem key={index} id={index} text={data.text} isComplete={data.isComplete} onChange={()=>onChange(index)}/>;
				}
			});
	
	return(
		<ul>
			{todo_list}
		</ul>	
	);
}


function Input(props){
	return(
		<div className="form_wrapper" onSubmit={props.handleSubmit}>
			<form name="new_todo">
				<input type="text" value={props.input} onChange={props.handleChange} />
				<input type="submit" value="Add" />
			</form>
		</div>
	);
}

function Toggle(props){
	let count = 0;
	const count_list = props.count;
	for(let i = 0; i < count_list.length; i++){
		if(!count_list[i].isComplete){
			count ++;
		}
	}
	
	return(
		<div className="toggle">
			
			<button className={props.show === -1 ? ' on ' : ''} onClick={() => props.onClick(-1)}>All</button>
			<button className={props.show === 0 ? ' on ' : ''} onClick={() => props.onClick(0)}>Active</button>
			<button className={props.show === 1 ? ' on ' : ''} onClick={() => props.onClick(1)}>Complete</button>
			<button onClick={props.onClearClick}>Clear Complete</button>
			<p>Left To-Do:{count}</p>
		</div>	
	);
}

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			input: '',
			todo: new Array(0),
			show:-1	
		}
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
		this.handleClearClick = this.handleClearClick.bind(this);
		
	}
	
	handleChange(e){
		this.setState({input: e.target.value});
	}
	
	handleSubmit(e){
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
	
	handleCheck(i){
		const new_todo = this.state.todo.slice();
		new_todo[i].isComplete = !new_todo[i].isComplete;
		this.setState({todo:new_todo});
	}
	
	handleShow(i){
		this.setState({show:i});
	}
	
	handleClearClick(){
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
				<Toggle	onClick={(i) => this.handleShow(i)} show={this.state.show} onClearClick={this.handleClearClick} count={this.state.todo}/>
			</div>
		);	
	}
	
}





ReactDOM.render(<App />, document.getElementById('root'));
