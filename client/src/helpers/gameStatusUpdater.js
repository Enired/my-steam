import axios from "axios"

export const updateGameStatus = (gameListItemId, status) => {
  
  switch (status.toLowerCase()) {
    case 'current':
      axios.put(`/games/${gameListItemId}/current`)
      break;
    case 'completed':
      axios.put(`/games/${gameListItemId}/completed`)
      break;
    case 'dropped':
      axios.put(`/games/${gameListItemId}/dropped`)
      break;
    case 'planned':
      axios.put(`/games/${gameListItemId}/planned`)
      break;
    default:
      break;
  }

}