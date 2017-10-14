import {markComplete,markActive,deleteTask} from './taskApi.js';

export const handleCheck = (id,complete,component) => {
  if(!complete){
    markComplete(id, component);
  }else{
    markActive(id,component);
  }  
}//handleCheck