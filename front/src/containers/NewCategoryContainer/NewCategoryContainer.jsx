import React, { Component } from 'react'
import {connect} from 'react-redux'

import AdminPanelContainer from '../AdminPanelContainer/AdminPanelContainer';
import NewCategory from '../../components/NewCategory'
import axios from 'axios';
import CategoryToast from './CategoryToast';
import CategoriesList from '../../components/CategoriesList';
import { fetchAllCellars, fetchAllLines, getGrapes } from '../../store/actions/ProductsActions';

class NewCategoryContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cellars : '',
			lines : '',
			grapes : '',
			open : false,
			status : false,
			allCellars : [],
			allGrapes : [],
			allLines : [],
		}
		this.handleSubmit= this.handleSubmit.bind(this);
		this.handleChange= this.handleChange.bind(this);
		this.handleClose= this.handleClose.bind(this);
		this.handleDelete= this.handleDelete.bind(this);
	}

	componentDidMount(){
		this.props.fetchCellars()
			.then(res => this.setState({ allCellars : res.cellars }))
		this.props.fetchLines()
			.then(res => this.setState({ allLines : res.lines }))
		this.props.fetchGrapes()
			.then(res => this.setState({ allGrapes : res.grapes }))
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

	handleDelete(type,path,id,index){
		axios.post(`/api/${path}/delete`,{ id })
			.catch(e => console.log(e))
		this.state[type].splice(index,1);
		this.setState({})
	}

	render() {
	return (
		<div style={{"display": "flex", 'height':'100%'}}>
			<AdminPanelContainer />
			<div style={{ 'display':'grid' }}>
				<NewCategory handleSubmit={ this.handleSubmit } handleChange={ this.handleChange }/>
				<CategoriesList 
					handleDelete={ this.handleDelete } 
					allGrapes={ this.state.allGrapes } 
					allLines={ this.state.allLines } 
					allCellars={ this.state.allCellars } 
				/>
				<CategoryToast open= { this.state.open } status= { this.state.status } handleClose= { this.handleClose } />
			</div>
		</div>
	)}
}

function mapStateToProps(state){
	return{ 
		user : state.user,
		allCellars : state.products.allCellars,
		allLines : state.products.allLines,
		allGrapes : state.products.grapes
	}
};

function mapDispatchToProps(dispatch){
	return{ 
		fetchCellars: () => {
			return dispatch(fetchAllCellars())
		},
		fetchGrapes: () => {
			return dispatch(getGrapes())
		},
		fetchLines: () => {
			return dispatch(fetchAllLines())
		},
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(NewCategoryContainer)





