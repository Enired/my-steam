import axios from "axios"

export const updateGameStatus = (gameListItemId, status) => {
  
  switch (status.toLowerCase()) {
    case 'current':
      axios.put(`/games/${gameListItemId}/current`)
      .then(res=>{console.log(res);console.log(gameListItemId)})
      console.log(gameListItemId)
      break;
    case 'completed':
      axios.put(`/games/${gameListItemId}/completed`)
      .then(res=>{console.log(res);console.log(gameListItemId)})
      break;
    case 'dropped':
      axios.put(`/games/${gameListItemId}/dropped`)
      .then(res=>{console.log(res);console.log(gameListItemId)})
      break;
    case 'planned':
      axios.put(`/games/${gameListItemId}/planned`)
      .then(res=>{console.log(res);console.log(gameListItemId)})
      break;
    default:
      break;
  }

}