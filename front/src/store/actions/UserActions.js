import axios from 'axios'
import {addProductToOrder} from './OrderActions'
import { LOG_A_USER, LOGOUT_USER } from '../constants';

const setLoggedUser = user => ({
    type: LOG_A_USER,
    user
}); 
 const endSession = () => ({
    type: LOGOUT_USER,
    user:{
        id: 0,
        firstName: '',
        lastName: '',
        email: ''
     }
})


export const loginUser = (email, password) => dispatch => {
    return axios.post('/api/user/login',{
        email,
        password,
    })
      .then(res => res.data)
      .then(user => dispatch(setLoggedUser(user)))
     
};
export const logoutUser=()=>dispatch =>{
    axios.post('/api/user/logout')
   .then(res => dispatch(endSession())) 
  
}


export const isLogged = () => dispatch => {
    axios.get('/me')
    .then(res => dispatch(setLoggedUser(res.data)))
}


