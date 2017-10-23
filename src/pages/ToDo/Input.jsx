import React from 'react';

const Input = (props) => {
  const { handleSubmit, content, due, handleChange, handleDateChange, error } = props;
  const errorState = error ? 'error' : '';
  return(
    <div className={errorState + " form_wrapper"} >
      <form name="new_task" onSubmit={handleSubmit}>
        <input 
          placeholder="What do you need to do?" 
          type="text" 
          value={content} 
          onChange={handleChange} 
        />
        
        <input 
          placeholder="mm/dd/yyyy" 
          type="date" value={due} 
          onChange={handleDateChange} 
        />
        
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}

export default Input
