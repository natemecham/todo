import React from 'react';
import Task from './Task';

const TaskList = (props) => {
  const { list, onChange, show, onDelete, handleUpdate, today } = props;
  
  const isOverDue = (t,d,c) =>{
    const aToday = new Date(t);
    const aDue = new Date(d);
    if(aToday > aDue && !c){
      return true;
    }else{
      return false;
    }
  }
  
  return(
    <ul>
      {list.sort(
          (a,b) => {
            const aDate = new Date(a.due);
            const bDate = new Date(b.due);
            return bDate - aDate;
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
        }).map((data,index,array) => {
          
          
          const overDue = isOverDue(today, data.due,data.completed);
          
          let showHeader;
          if(index === 0 || data.due != array[index-1].due){
            showHeader = true;
          }else{
            showHeader = false;
          }
          return <Task
            showHeader={showHeader}
            key={data.id}
            id={data.id}
            due={data.due}
            content={data.content}
            isComplete={data.completed}
            onChange={() => onChange(data.id, data.completed)}
            isMenuOpen={data.isMenuOpen}
            onDelete={() => onDelete(data.id, index)}
            flip={data.flip}
            handleUpdate={handleUpdate}
            isOverDue={overDue}
          />;
        })
      }
    </ul>
  );
}

export default TaskList;
