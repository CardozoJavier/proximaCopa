import React, { Component } from 'react'
import {connect} from 'react-redux'

import AdminPanelContainer from '../AdminPanelContainer/AdminPanelContainer';
import NewCategory from '../../components/NewCategory'
import axios from 'axios';
import CategoryToast from './CategoryToast';
import CategoriesList from '../../components/CategoriesList';
import { fetchAllCellars } from '../../store/actions/ProductsActions';

class NewCategoryContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cellars : '',
			lines : '',
			grapes : '',
			open : false,
			status : false,
		}
		this.handleSubmit= this.handleSubmit.bind(this);
		this.handleChange= this.handleChange.bind(this);
		this.handleClose= this.handleClose.bind(this);
		this.handleDelete= this.handleDelete.bind(this);
	}

	componentDidMount(){
		this.props.fetchCellars();
	}

	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value,
		})
	}

	handleSubmit(e){
		e.preventDefault();
		var type= e.target.name;
		var value= this.state[type];
		axios.post(`/api/${type}/create`,{ value })
			.then(res => res.data[1])
			.then(status => this.setState({ status, open : true }))
	}

	handleClose(){
		this.setState({
			open : false
		});
	}

	handleDelete(e){
		console.log(e.target, ' <==')
	}

	render() {
	return (
		<div style={{"display": "flex", 'height':'100%'}}>
			<AdminPanelContainer />
			<NewCategory handleSubmit={ this.handleSubmit } handleChange={ this.handleChange }/>
			<CategoriesList allCellars={ this.props.allCellars } handleDelete={ this.handleDelete } />
			<CategoryToast open= { this.state.open } status= { this.state.status } handleClose= { this.handleClose } />
		</div>
	)}
}

function mapStateToProps(state){
	return{ 
		user : state.user,
		allCellars : state.products.allCellars,
	}
};

function mapDispatchToProps(dispatch){
	return{ 
		fetchCellars: () => {
			dispatch(fetchAllCellars())
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(NewCategoryContainer)





