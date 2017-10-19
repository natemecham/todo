import React from 'react';

class Task extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.theTask.completed && nextProps.theTask.completed) {
      window.requestAnimationFrame(() => {
        this.label.classList.add("flip");
      });
    } else if (this.props.theTask.completed && !nextProps.theTask.completed) {
      window.requestAnimationFrame(() => {
        this.label.classList.remove("flip");
      });
    }
  }
  render(){
    const { theTask, onChange, onDelete } = this.props;
    const createdDateObj = new Date(theTask.created_at);
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const createdDate = createdDateObj.getHours()%12 +':'+ createdDateObj.getMinutes() + (createdDateObj.getHours() > 12 ? 'PM' : 'PM') +' '+ monthNames[createdDateObj.getMonth()] + ' ' + createdDateObj.getFullYear();
    const isCompleteClass = theTask.completed ? 'complete' : 'incomplete';
    
    return(
      <div className="single-wrapper">
        <div className={'single ' + isCompleteClass}>
          <input type="checkbox" checked={theTask.completed} value={theTask.id} id={"list_"+theTask.id} onChange={ () => onChange(theTask.id, theTask.completed)}  />
          <label htmlFor={"list_"+theTask.id} ref={(c) => { this.label = c; }} >
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
}

export default Task;
