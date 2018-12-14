import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import s from '../Navbar/Navbar.css'
import axios from 'axios'
import ShoppingCart from '../../components/ShoppingCart'
import NavbarInput from '../../components/NavbarInput';
import { connect } from 'react-redux';
import { getProductsBySearchNavbar } from '../../store/actions/FilterActions';

function mapStateToProps(state, ownProps) {
  return {
    filtrosNavbar: state.products.filteredProducts
  };
}
function mapDispatchToProps(dispatch, ownProps) {
  return {
    getProductsBySearchNavbar: nombre => {
      dispatch(getProductsBySearchNavbar(nombre));
    },
  };
}

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchNavbar: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    return (
      <div className={s.container}>
              
        <div className={s.leftSideNavbar}>
          <li> <Link to="/">HOME</Link></li>          
        </div>

        <div className={s.middleNavbar}>
          <NavbarInput 
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>

        <div className={s.rightSideNavbar}>
          <div>LOGIN</div>
          <div><ShoppingCart /></div>
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)







