import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'


import AdminPanelContainer from '../AdminPanelContainer/AdminPanelContainer';
import NewCategory from '../../components/NewCategory'
import CreateCategoryGrape from '../../components/CreateCategoryGrape'
import CreateCategoryLine from '../../components/CreateCategoryLine'
import CreateCategoryCellar from '../../components/CreateCategoryCellar'

import {logoutUser} from '../../store/actions/UserActions'
import { getProductsBySearchNavbar } from '../../store/actions/FilterActions';

class NewCategoryContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            boton: 'ninguno',
            valorInput: ""
        }
        this.logOut = this.logOut.bind(this)
        this.handleClickSelect = this.handleClickSelect.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this) 
    }

    logOut(e){
        this.props.logoutUser()
    }

    handleClickSelect(val){
        this.setState({
            boton: val,
            valorInput: ""
        })
    }

    handleChange(event){
        console.log(event.target.value)
        this.setState({
            valorInput: event.target.value,
        })
        ///api/grapes/agregarUva
    }

    handleSubmit(e){
        e.preventDefault();
    }


    render() {
    //LINEA BODEGA UVA
    return (
        <div style={{"display": "flex"}}>
            <AdminPanelContainer />
            <div id="AgregarCategoriasAdmin" style={{"display": "flex", "flexDirection": "column"}}>
                <NewCategory handleClickSelect={this.handleClickSelect}/>
                {
                    this.state.boton == 'uva' ? <CreateCategoryGrape handleSubmit={this.handleSubmit} handleChange={this.handleChange}/> : null
                }
                {
                    this.state.boton == 'linea' ? <CreateCategoryLine handleSubmit={this.handleSubmit} handleChange={this.handleChange}/> : null
                }
                {
                    this.state.boton == 'bodega' ? <CreateCategoryCellar handleSubmit={this.handleSubmit} handleChange={this.handleChange}/> : null
                }
            </div>

        </div>
    )}
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
    }
};



export default connect(mapStateToProps,mapDispatchToProps)(NewCategoryContainer)





