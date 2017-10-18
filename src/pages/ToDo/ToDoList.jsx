import React from 'react';
import ToDoListItem from './ToDoListItem';

const ToDoList = (props) => {
  const { list, onChange, show, handleDropDown, onDelete } = props;
  return(
    <ul>
      {list.sort(
          (a,b) => {
            const aDate = new Date(a.created_at);
            const bDate = new Date(b.created_at);
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
        }).map((data,index) => {
          return <ToDoListItem
            key={index}
            id={data.id}
            text={data.content}
            isComplete={data.completed}
            onChange={() => onChange(data.id, data.completed)}
            handleDropDown={() => handleDropDown(index)}
            isMenuOpen={data.isMenuOpen}
            onDelete={() => onDelete(data.id, index)}
            flip={data.flip}
          />;
        })
      }
    </ul>
  );
}

export default ToDoList;
