import React from 'react';

const TaskMenu = (props) =>{
  const {handleDropDown, handleEdit, onDelete} = props;
  return(
    <div className='drop_down'>
      <button className="toggle_drop" onClick={handleDropDown}></button>
      <div className="menu">
        <button className="btn" onClick={handleEdit} >Edit</button>
        <button onClick={onDelete} className="delete btn">Delete</button>
      </div>
    </div>
  );
}

export default TaskMenu;