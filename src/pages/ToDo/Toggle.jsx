import React from 'react';
import classNames from 'classnames/bind';

const Toggle = (props) => {
  const { todo, onClick, onClearClick, showMenu, showClear } = props;
  
  const activeTodoCount = todo.reduce( (sum,todo ) => {
    return sum + (!todo.completed ? 1 : 0);
  }, 0);

  const completeTodoCount = todo.reduce( (sum,todo ) => {
    return sum + (todo.completed ? 1 : 0);
  }, 0);

  const allTodoCount = todo.length;
  
  const toggleClass = classNames({
    'showMenu': showMenu,
    'showClear': showClear,
    'toggle':true
  });
  

  return(
    <div className="toggleWrapper">
      <div className={toggleClass}>
        <div className="toggle_menu">
          <div className="toggle_menu_header">
            <p>Show:</p>
          </div>
          <input type="checkbox" id="toggle_all" checked={props.show === 'all' ? true  : false}/>
          <label 
            htmlFor="toggle_all"
            onClick={() => onClick('all')}>
            All
          </label>
          
          <input type="checkbox" id="toggle_active" checked={props.show === 'active' ? true  : false}/>
          <label 
            htmlFor="toggle_active"
            className={props.show === 'active' ? ' on ' : ''} 
            onClick={() => onClick('active')}>
            Active
          </label>
          
          <input type="checkbox" id="toggle_complete" checked={props.show === 'complete' ? true  : false}/>
          <label
            htmlFor="toggle_complete" 
            className={props.show === 'complete' ? ' on ' : ''} 
            onClick={() => onClick('complete')}>
            Complete 
          </label>
        </div>//toggle_menu
        
        <button className="toggle_filter">{props.show}</button>
  
        <button 
          className="clear text_btn" 
          onClick={onClearClick}>
          Clear Complete
        </button>   
      </div>
      <div className="curtain"></div>
    </div>
  );
}

export default Toggle;
