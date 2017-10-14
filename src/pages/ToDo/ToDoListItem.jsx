import React from 'react';
import { Link } from 'react-router-dom';

const ToDoListItem = (props) => {
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
          <Link className="btn" to={`/task/${id}`}>See Details</Link>
          <button onClick={onDelete} className="delete btn">Delete</button>
        </div>
      </div>
    </li>
  );
}

export default ToDoListItem;
