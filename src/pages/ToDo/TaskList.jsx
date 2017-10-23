import React from 'react';
import Task from './Task';

const TaskList = (props) => {
  const { list, onChange, show, onDelete, handleUpdate } = props;
  
  return(
    <ul>
      {list.sort(
          (a,b) => {
            const aDate = new Date(a.due);
            const bDate = new Date(b.due);
            return aDate - bDate;
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
          />;
        })
      }
    </ul>
  );
}

export default TaskList;
