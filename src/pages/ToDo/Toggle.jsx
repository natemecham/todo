import React from 'react';

const Toggle = (props) => {
  const { todo, onClick, onClearClick } = props;
  const activeTodoCount = todo.reduce( (sum,todo ) => {
    return sum + (!todo.completed ? 1 : 0);
  }, 0);

  const completeTodoCount = todo.reduce( (sum,todo ) => {
    return sum + (todo.completed ? 1 : 0);
  }, 0);

  const allTodoCount = todo.length;

  return(
    <div className="toggle">
      <button className={props.show === 'all' ? ' on ' : ''} onClick={() => onClick('all')}>All <span>{allTodoCount}</span></button>
      <button className={props.show === 'active' ? ' on ' : ''} onClick={() => onClick('active')}>Active <span>{activeTodoCount}</span></button>
      <button className={props.show === 'complete' ? ' on ' : ''} onClick={() => onClick('complete')}>Complete <span>{completeTodoCount}</span></button>
      <button className="clear" onClick={onClearClick}>Clear Complete</button>
      <sub>v2</sub>
    </div>
  );
}

export default Toggle;
