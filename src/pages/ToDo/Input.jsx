import React from 'react';

const Input = (props) => {
  const { handleSubmit, input, handleChange, error } = props;
  const errorState = error ? 'error' : '';
  return(
    <div className={errorState + " form_wrapper"} onSubmit={handleSubmit}>
      <form name="new_todo">
        <input placeholder="What do you need to do?" type="text" value={input} onChange={handleChange} />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}

export default Input
