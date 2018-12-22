import axios from "axios"
import ReduxThunk from 'redux-thunk' 
import { func } from "prop-types";
import {isLogged} from "./UserActions"
import { FETCH_ORDERS } from '../constants';

const add_product_to_order = function(product){
    return {
        type: "ADD_TO_ORDER",
        product
    }
}
const remove_product_from_order=function(product){
   return{
       type:"REMOVE_FROM_ORDER", 
       product
    }   
}
const delete_product_from_order=function(product){
    return{
        type:"DELETE_FROM_ORDER",
        product
    }
}
const add_store_to_state=function(storage){
    return{
        type:"ADD_STORAGE_TO_STATE",
        storage
    }
}
const empty_cart = function(){
    return{
        type:"EMPTY_CART",
        carrito:[]
    }
}
const set_cart_from_user_to_store=function(storage){
    return{
        type:"SET_CART_FROM_DATA_BASE_TO_STORE",
        storage
    }
}

const fetchOrders= (allOrders) => {
	return {
		type : FETCH_ORDERS,
		allOrders
	}
}


export const handleEmptyOrder = (user) => {
    return (dispatch, getState) => {
        dispatch(empty_cart())
        setLocalStorage(getState())
        // if(user.user) deleteOrderFromDataBase(user)
       
    }
}

export const addProductToOrder = (product, user) => {
    return (dispatch, getState) => {
        dispatch(add_product_to_order(product))
        setLocalStorage(getState())
        if(user.firstName) addProductToDataBase(product, user)
        else {console.log("no loggeado")}
        
    }
}
export const removeProductFromOrder = (product, user)=>{
  //resta una unidad del producto de la orden
    return(dispatch, getState)=>{
        dispatch(remove_product_from_order(product))
        setLocalStorage(getState())
        if(user.firstName){
            deleteOneProductFromDataBase(product, user)}
        else {console.log("no loggeado")}
    }
}
export const deleteProductFromOrder=(product, user)=>{
    //elimina el producto de la orden
    return(dispatch, getState)=>{
        dispatch(delete_product_from_order(product))
        setLocalStorage(getState())
        if(user.firstName){
            deleteProductFromDataBase(product, user)}
        else {console.log("no loggeado")}
    }
}
export const setStateByStorage=(storage)=>{
    return(dispatch)=>{
            dispatch(add_store_to_state(storage))
    }
}
export const addProductToDataBase=(product, user) =>{
         axios.post('/api/orders/addProductToOrder',{
           userId :user.id,
           productId:product.id
        }) 
    }
export const deleteOneProductFromDataBase=(product, user)=>{
    axios.post('/api/orders/removeProductFromOrder',{
        userId :user.id,
        productId:product.id
    })
} 
export const deleteProductFromDataBase=(product, user)=>{
    axios.post('/api/orders/deleteProductFromOrder',{
        userId :user.id,
        productId:product.id
    })
} 
export const deleteOrderFromDataBase=(user)=>{
    axios.post('/api/orders/deleteAllProducts',{
        userId: user.id
    })

}
// export const setCartFromUserToStore = (user) => dispatch => {
//     axios.get(`api/orders/cartOfUser/${user.id}`)
//          .then(cart=>cart.data )
//          .then(obj=> obj)
//          .then(cart=> console.log(cart), "carrito") 
         
        
// }




export const setLocalStorage = ({ order }) => {
    //SETE
    var setOrder = JSON.stringify(order.products)
    localStorage.setItem("order", setOrder)  
}


export const sendEmail= (user, order) => (dispatch) => {
	axios.post('/api/orders/email', {
		user,
		order
	})
		.catch(e => console.log(e))
}



export const fetchAllOrders= () => dispatch => {
	return axios.get('/api/orders')
		.then(res => res.data)
		.then(orders => dispatch(fetchOrders(orders)))
}

