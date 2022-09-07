import axios from "axios"

export const updateGameStatus = (appid, status) => {
  
  switch (status.toLowerCase()) {
    case 'current':
      axios.put(`/games/${appid}/current`)
      .then(res=>{console.log(res);console.log(appid)})
      break;
    case 'completed':
      axios.put(`/games/${appid}/completed`)
      .then(res=>{console.log(res);console.log(appid)})
      break;
    case 'dropped':
      axios.put(`/games/${appid}/dropped`)
      .then(res=>{console.log(res);console.log(appid)})
      break;
    case 'planned':
      axios.put(`/games/${appid}/planned`)
      .then(res=>{console.log(res);console.log(appid)})
      break;
    default:
      break;
  }

}