import React from 'react';
//import { Link } from 'react-router-dom';
import {formatDate,printDate} from '../../utilities/dateFunctions.js';
import classNames from 'classnames/bind';
import TaskMenu from './TaskMenu'


class Task extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isMenuOpen:false,
      isEdit: false,
      input_error:false,
      editContent:this.props.content,
      editDue:formatDate(this.props.due)
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (!this.props.isComplete && nextProps.isComplete) {
      window.requestAnimationFrame(() => {
        this.label.classList.add("flip");
      });
    } else if (this.props.isComplete && !nextProps.isComplete) {
      window.requestAnimationFrame(() => {
        this.label.classList.remove("flip");
      });
    }
  }//componentWillRecieveProps
  
  handleChange = (e) => {
    if(e.target.value.length > 200){
      this.setState({input_error:true});
    }else{
       this.setState({input_error:false});
    }
    this.setState({editContent: e.target.value});
  }
  
  handleDateChange = (e) => {
    this.setState({editDue: e.target.value});
  }
   
  handleDropDown = () => {
    this.setState({isMenuOpen:!this.state.isMenuOpen});
  }
  
  handleEdit = (id,content,due) => {
    this.setState({isEdit: !this.state.isEdit});
    this.setState({isMenuOpen:!this.state.isMenuOpen});
  }
   
  handleCancel = (e) =>{
    e.preventDefault();
     this.setState({isEdit: !this.state.isEdit});
  }
  
  handleUpdate = (e,id,content,due) =>{
    this.props.handleUpdate(e,id,content,due);
    this.setState({isEdit:!this.state.isEdit});
  }

  render() {
    const {isComplete,id,onChange,onDelete,showHeader,due,isOverDue} = this.props;
    const taskClasses =classNames({
      'complete' : isComplete,
      'menuOpen' :this.state.isMenuOpen,
      'edit': this.state.isEdit,
      'todo_item':true,
      'header': showHeader,
      'overdue': isOverDue,
    });
    
    let header;
    if(showHeader){
      header = <h2>{printDate(due)}</h2>;
    }
    
    if(this.state.isEdit){
      return(
        <li className={taskClasses}>
          {header}
          <div className='task_wrapper'>
            <input type="checkbox" checked={isComplete} value={id} id={"list_"+id} onChange={onChange}/>
            <label ref={(c) => { this.label = c; }} htmlFor={"list_"+id}></label>
              <form 
                name="update_task" 
                onSubmit={
                  (e)=>{
                    this.handleUpdate(e,id,this.state.editContent,this.state.editDue);
                  }
                }
              >
                <input 
                  placeholder="What do you need to do?" 
                  onChange={this.handleChange} type="text" 
                  value={this.state.editContent} 
                />
                <input 
                  placeholder="mm/dd/yyyy" 
                  type="date" 
                  onChange={this.handleDateChange} 
                  value={this.state.editDue}  
                />
                
                <input type="submit" value="Update" />
                <button onClick={this.handleCancel}>Cancel</button>
              </form>
            
            <TaskMenu 
              handleEdit={this.handleEdit}
              handleDropDown={this.handleDropDown}
              onDelete={onDelete}
            />
            </div>
        </li>
      );
    }else{
      return(
        
       <li className={taskClasses}>
         {header}
          <div className='task_wrapper'>
            <input type="checkbox" checked={isComplete} value={id} id={"list_"+id} onChange={onChange}/>
            <label ref={(c) => { this.label = c; }} htmlFor={"list_"+id}>
              {this.state.editContent}
            </label>
            <TaskMenu 
              handleEdit={this.handleEdit}
              handleDropDown={this.handleDropDown}
              onDelete={onDelete}
            />
          </div>
        </li>
      );
    }
  }
}

export default Task;
