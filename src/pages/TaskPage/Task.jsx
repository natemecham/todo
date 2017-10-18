import React from 'react';

const Task = (props) =>{
  const { theTask, onChange, onDelete } = props;
  
  const createdDateObj = new Date(theTask.created_at);
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  const createdDate = createdDateObj.getHours()%12 +':'+ createdDateObj.getMinutes() + (createdDateObj.getHours() > 12 ? 'PM' : 'PM') +' '+ monthNames[createdDateObj.getMonth()] + ' ' + createdDateObj.getFullYear();
  const isCompleteClass = theTask.completed ? 'complete' : 'incomplete';
  const flipAction = theTask.flip ? 'flip' : '';
  
  return(
    <div className="single-wrapper">
      <div className={'single ' + isCompleteClass}>
        <input type="checkbox" checked={theTask.completed} value={theTask.id} id={"list_"+theTask.id} onChange={ () => onChange(theTask.id, theTask.completed)}  />
        <label htmlFor={"list_"+theTask.id} className={flipAction}>
          {theTask.content}
        </label>
      </div>
      <div className="single-footer">
        <p className="meta id">{theTask.id}</p>
        <p className="meta created">{createdDate}</p>
        <button className="delete" onClick={()=>{onDelete(theTask.id)}}>Delete</button>
      </div>
    </div>
  );
}

export default Task;