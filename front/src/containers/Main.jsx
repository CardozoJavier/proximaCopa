// IMPORT SINCE LIBRARIES
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux'

import s from './Main.css'

//IMPORT CONTAINERS
import ProductsGridContainer from './ProductsGrid/ProductsGridContainer'
import NavbarContainer from './NavbarContainer/NavbarContainer'
import RegisterContainer from './Register/RegisterContainer';
import OneProductContainer from '../containers/OneProductContainer/OneProductContainer'
import AdminPanelContainer from './AdminPanelContainer/AdminPanelContainer';
import NewProductContainer from './NewProductContainer/NewProductContainer';
import CheckoutContainer from '../containers/Checkout/CheckoutContainer'
import LoginContainer from '../containers/Login/LoginContainer'
import ProductListContainer from './ProductListContainer/ProductListContainer';
import Toast1 from '../containers/Toasts/toast1'
import NewCategoryContainer from '../containers/NewCategoryContainer/NewCategoryContainer'

//IMPORT COMPONENTS
import Sidebar from '../components/Sidebar';
import Carrito from '../containers/Cart/CartContainer';

//IMPORT ACTIONS STORE
import {isLogged} from '../store/actions/UserActions'
import { fetchAllProducts } from '../store/actions/ProductsActions'
import SidebarContainer from './Sidebar/SidebarContainer';
import { setLocalStorage, setStateByStorage, setCartFromUserToStore } from '../store/actions/OrderActions';

//MATERIAL UI VALIDATION
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

class Main extends React.Component {
    constructor(props) {
        super(props);        
    }

    componentDidMount() {
        this.props.fetchAllProducts();
        this.props.isLogged();
        this.checkLocalStorage();
        // (this.props.user.id && this.props.setCartFromUserToStore(this.props.user))
    }
    // componentWillReceiveProps(nextProps){
    //     if(nextProps != this.props){
    //         (this.props.user.id && this.props.setCartFromUserToStore(this.props.user))

    //     }
    // }
    checkLocalStorage(){
        //chequea el localstorage, en caso de tener algo,
        // si el store de redux esta vacio, se setea el store de redux con el local storage
        var auxStorage= JSON.parse(localStorage.getItem("order"))
        if(auxStorage && this.props.order.products.length ==0){
            this.props.setStateByStorage(auxStorage)
        }
    }

    render() {
        const user = this.props.user
        return (
            <div className={s.container}>
                <div className={s.navbar}>
                    <NavbarContainer user={user}/>
                </div>
                    <div className={s.main}>
                        <Switch>
                            <Route exact path="/checkout" component={CheckoutContainer}/>
                            <Route exact path="/Toast1" component={Toast1}/>
                            <Route exact path="/" component={ProductsGridContainer}/>
                            <Route path ="/register" component ={RegisterContainer}/>
                            <Route path ="/login" component ={ LoginContainer}/>     
                            <Route exact path="/carrito" component={ Carrito }/>                
                            <Route exact path="/OneProduct/:id" component={OneProductContainer}/>     
                            <Route path='/admin' component={AdminPanelContainer} />
                            <Route path='/newproduct' component={NewProductContainer} />
                            <Route path='/newcategory' component={NewCategoryContainer} />            
                            <Route path='/product/edit' component={ProductListContainer} />
                        </Switch>
                    </div>
                 </div>   
        );
    }
}

function mapStateToProps(state){

    return{ 
        user: state.user,
        order: state.order
    }
};


        
function mapDispatchToProps(dispatch){
    return{
        isLogged: function(){
            dispatch(isLogged())
        },
        fetchAllProducts: function() {
            dispatch(fetchAllProducts())
        },
        setStateByStorage:function(storage){
            dispatch(setStateByStorage(storage))
        },
        // setCartFromUserToStore:function(user){
        //     dispatch(setCartFromUserToStore(user))
        // }
}};

export default connect(mapStateToProps,mapDispatchToProps)(Main)

