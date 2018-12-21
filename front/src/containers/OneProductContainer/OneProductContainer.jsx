import React, { Component } from 'react';
import { connect } from 'react-redux';
import SidebarContainer from '../Sidebar/SidebarContainer'
import s from '../Main.css'

import SingleProduct from '../SingleProduct/SingleProduct';
import SimilarProductsContainer from '../SimilarProducts/SimilarProductsContainer';
import { selectSingleProduct, fetchSimilarProducts } from '../../store/actions/ProductsActions'

class OneProductContainer extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.selectSingleProduct(this.props.match.params.id)   
		this.props.fetchSimilarProducts(this.props.match.params.id)
	}

	render() {
		return (
			<div className={s.row}> 
				<div  className={s.main}>
					<SingleProduct selectedProduct={this.props.selectedProduct}/>
					<SimilarProductsContainer relatedProducts={this.props.similarProducts}/>                         
				</div>
			</div>
			)
		}
	}
			
function mapStateToProps(state) {
	return {
		selectedProduct: state.products.selectedProduct,
		similarProducts: state.products.similarProducts
	}
}
function mapDispatchToProps(dispatch) {
	return {
		selectSingleProduct: function(product){
			dispatch(selectSingleProduct(product))
		},
		fetchSimilarProducts: function(producto) {
			dispatch(fetchSimilarProducts(producto))
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps) (OneProductContainer);
