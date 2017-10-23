export const formatDate = (dateString) => {
  let today;
  if(!dateString){
    today = new Date();
  }else{
    today = new Date(dateString);
  }
  
  let dd = today.getDate();
  let mm = today.getMonth()+1; //January is 0!
  let yyyy = today.getFullYear();

	if(dd<10) {
	    dd = '0'+dd
	} 
	
	if(mm<10) {
	    mm = '0'+mm
	} 
	today =  yyyy + '-' + mm + '-' + dd ;
	return today;
}

export const printDate = (dateString) => {
  let today;
  if(!dateString){
    today = new Date();
  }else{
    today = new Date(dateString);
  }
  
  let dd = today.getDate();
  let mm = today.getMonth()+1; //January is 0!
  let yy = today.getFullYear().toString().substr(-2);

	if(dd<10) {
	    dd = '0'+dd
	} 
	
	if(mm<10) {
	    mm = '0'+mm
	} 
	today =  mm + '/' + dd + '/' + yy ;
	return today;
}