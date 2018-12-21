import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminPanelContainer from '../AdminPanelContainer/AdminPanelContainer';

class OrderManagerContainer extends Component {
	constructor(props){
		super(props);
	}
	render(){
		return (
			<AdminPanelContainer />
		)
	}
}

const mapStateToProps= (state) => {
	return {

	}
}

const mapDispatchToProps= (dispatch) => {
	return {

	}
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderManagerContainer);