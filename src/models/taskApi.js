import {corsRequest, handleErrors} from '../utilities/fetchHelpers.js';

/*const getAPIKey = () => {
  const url = 'https://altcademy-to-do-list-api.herokuapp.com/users';
  const header = {
    method: 'post'
  };
  const api_key = fetch(url, header)
  .then(handleErrors)
  .then(response => {
    return response.json();
  }).catch((err) => {
    console.error(err);
  });
}*/
// run once to get started: getAPIKey()

const api_key = process.env.REACT_APP_API_KEY;

export const getTodoList = (component, cb) => {
  const url = `https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=${api_key}`;
  const methods = {
    method: 'GET'
  };
  return fetch(url, methods)
  .then(handleErrors);
}

export const getSingleTask = (id) => {
  const url = `https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=${api_key}`;
  const methods = {
    method: 'GET'
  };
   
  return fetch(url,methods)
   .then(handleErrors)
   .then(data => {
      return data.tasks.find(task => {
        return id === task.id
      });
   })
}


export const createTask = (content,due) => {
  const url = `https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=${api_key}`;
  const dueDateTime = new Date(due);
  const options = {
    method: 'POST',
    body: JSON.stringify({
      task: {
        content: content,
        due: dueDateTime
      }
    })
  };

  return fetch(url, corsRequest(options))
  .then(handleErrors)
}

export const editTask = (id,content,due) => {
  const url = `https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}?api_key=${api_key}`;
  const dueDateTime = new Date(due);
  const options = {
    method: 'PUT',
    body: JSON.stringify({
      task: {
        content: content,
        due: dueDateTime
      }
    })
  };
    console.dir(options);
  return fetch(url, corsRequest(options))
  .then(handleErrors)
}



export const markComplete = (id) => {
  const url = `https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}/mark_complete?api_key=${api_key}`;
  const options = { method: 'PUT' };

  return fetch(url, options)
  .then(handleErrors)
}

export const markActive = (id) => {
  const url = `https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}/mark_active?api_key=${api_key}`;
  const options = {method: 'PUT'};

  return fetch(url, options)
  .then(handleErrors)
}

export const deleteTask = (id) =>{
  const url = `https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}?api_key=${api_key}`;
  const options = {method: 'DELETE'};

  return fetch(url, options)
  .then(handleErrors)
}