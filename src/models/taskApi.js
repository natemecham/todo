import {corsRequest, handleErrors} from '../utilities/fetchHelpers.js';

const getAPIKey = () => {
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
}
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

export const getSingleTask = (id, component) => {
  getTodoList(component)
  .then( data => {
    const wholeList = component.state.todo.slice();
    const singleTask = wholeList.filter(task => {
      return task.id === id;
    });

    console.dir(singleTask);
  });
}

export const createTask = (content) => {
  const url = `https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=${api_key}`;
  const options = {
    method: 'POST',
    body: JSON.stringify({
      task: {
        content
      }
    })
  };

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

export const deleteTask = (id,component) =>{
  const url = `https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}?api_key=${api_key}`;
  const options = {method: 'DELETE'};

  return fetch(url, options)
  .then(handleErrors)
}

