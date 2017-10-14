import {corsRequest, handleErrors} from '../utilities/fetchHelpers.js';
const getAPIKey = () => {
    const url = 'https://altcademy-to-do-list-api.herokuapp.com/users';
    const header = {
      method: 'post'
    };
    const api_key = fetch(url, header).then(handleErrors).then(response => {
      console.log(response);
      return response.json();
    }).catch(
      (err) => {
        console.log(err);
      });
  }
// run once to get started: getAPIKey()

const api_key = '22';

export const getTodoList = (component, cb) => {
    const url = `https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=${api_key}`;
    const methods = {
      method: 'GET'
    };
    fetch(url, methods)
    .then(handleErrors)
    .then(
      (data) => {
        const theList = data.tasks;
        component.setState({todo: theList, loading:false});
        return Promise.resolve();
      }).catch(
      (err) => {
        throw new Error(err.statusText);
      });
} //end getToDoList

export const getSingleTask = (id,component) => {
   console.log('eek');
  getTodoList(component)
  .then( data => {
    const wholeList = component.state.todo.slice();
    const singleTask = wholeList.filter(task => {
        return task.id == id;
    });
    
    console.dir(singleTask); 
  });

}//getSingleTask

export const createTask = (new_text, component) => {
  const url = `https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=${api_key}`;
  const options = {
    method: 'POST',
    body: JSON.stringify({
      task: {
        content: new_text
      }
    })
  }; //end options
  fetch(url, corsRequest(options))
  .then(handleErrors)
  .then((response) => {
      getTodoList(component);
      return response;
    }).catch(err => {
        return err;
  });
}

export const markComplete = (id, component) => {
    const url = `https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}/mark_complete?api_key=${api_key}`;
    const options = {method: 'PUT'};
    fetch(url, options)
    .then(handleErrors)
    .then(data => {
      getTodoList(component);
      return data;
    }).catch(err => {
      throw new Error(err.statusText);
    });
} //markComplete

export const markActive = (id, component) => {
    const url = `https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}/mark_active?api_key=${api_key}`;
    const options = {method: 'PUT'};
    fetch(url, options)
    .then(handleErrors)
    .then(data => {
      getTodoList(component);
      return data;
    }).catch(err => {
      throw new Error(err.statusText);
    });
}//markActive

export const deleteTask = (id,component) =>{
  const url = `https://altcademy-to-do-list-api.herokuapp.com/tasks/${id}?api_key=${api_key}`;
  const options = {method: 'DELETE'};
  
  fetch(url, options)
  .then(handleErrors)
  .then(data => {
    getTodoList(component);
    return data;
  }).catch(err => {
    throw new Error(err.statusText);
  });
}//end deleteTask

