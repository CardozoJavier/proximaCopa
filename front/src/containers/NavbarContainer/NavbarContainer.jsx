import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'


import Navbar from '../../components/Navbar';
import {logoutUser} from '../../store/actions/UserActions'
import {handleEmptyOrder} from '../../store/actions/OrderActions'
import { getProductsBySearchNavbar } from '../../store/actions/FilterActions';


class NavbarContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchNavbar: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.logOut = this.logOut.bind(this)
  }
  componentDidMount(){
    // console.log(this.props.user)
  }
  logOut(e){
    e.preventDefault();
    this.props.logoutUser()
    this.props.handleEmptyOrder()
    }
  handleSubmit() {
    let formatSearch = this.state.searchNavbar

    formatSearch = formatSearch.replace(/(\w)(\w*)/g,
      function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();});

    this.props.getProductsBySearchNavbar(formatSearch);
    // this.props.history.push('/productos');
  }

  handleChange(e) {
    this.setState({
      searchNavbar: e.target.value,
    });
  }

  render() {
    const user = this.props.user
   
    return (

      <Navbar
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}
      logOut={this.logOut}
      user={user}
      />
      // <div className={s.container}>
              
      //   <div className={s.leftSideNavbar}>
      //     <li> <Link to="/">HOME</Link></li>          
      //   </div>

      //   <div className={s.middleNavbar}>
      //     <NavbarInput 
      //       handleChange={this.handleChange}
      //       handleSubmit={this.handleSubmit}
      //     />
      //   </div>

      //   <div className={s.rightSideNavbar}>
        
      //   <div>
      
      //   {(user.admin )&& <button> ADMIN </button>}
      //     <li> <Link to="/checkout">CHECKOUT</Link></li>          
      //   </div>

      //   <div className={s.rightSideNavbar}>
      //     <ul>
      //     {(user.firstName) && <button onClick={this.logOut}>Logout </button> }
      //     {!(user.firstName) &&  <Link to="/login"> LOGIN  </Link>}
      //     {!(user.firstName) &&   <Link to="/register">  REGISTER </Link>}
      //     </ul>
      //     <div><ShoppingCart /></div>
          
      //   </div>

      // </div>
      // </div>
    )
  }
}

function mapStateToProps(state){
    return{ 
        user : state.user,
        filtrosNavbar: state.products.filteredProducts,

    }
};

function mapDispatchToProps(dispatch){
    return{ 
      logoutUser: ()=>{
        dispatch(logoutUser())
    },
      getProductsBySearchNavbar:(nombre)=> {
        dispatch(getProductsBySearchNavbar(nombre))
      },
      handleEmptyOrder:()=>{
        dispatch(handleEmptyOrder())
      }
    }
};



export default connect(mapStateToProps,mapDispatchToProps)(NavbarContainer)





