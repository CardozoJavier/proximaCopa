import React from 'react';
import { connect } from 'react-redux';

import { addProductToOrder, setLocalStorage } from '../../store/actions/OrderActions'

import s from './SingleProduct.css'
import s2 from './styles2.css'

//MATERIAL UI PARA EL TOAST
import { MySnackbarContentWrapper} from '../Toasts/toast1'
import Snackbar from '@material-ui/core/Snackbar';

class SingleProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            //Open es para el toast
            open: false,
        }
        this.handleClickCart = this.handleClickCart.bind(this)
    }

    handleClickCart(product){
				var user= this.props.user;
        this.props.addProductToOrder(product,user);
        this.handleClickToast();
    }
    
     handleClickToast = () => {
        this.setState({ open: true });
    };
    
    handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };
    render() {
        return (
            <div >
                {
                    this.props.selectedProduct ?
                        <div className={s2.singleProdContainer}>
                            <div className={s2.imgProd}>
                                <img src={this.props.selectedProduct.image}></img>
                            </div>
                            <div className={s2.descripcionProd}>
                                <h1>{this.props.selectedProduct.productName}  {this.props.selectedProduct.year}</h1>
                                <h2 className={s2.precio}>$ {this.props.selectedProduct.price}</h2>
                                <h3 className={s2.precio}>Stock Disponible: <span>{this.props.selectedProduct.stock} </span></h3>
                                <p> {this.props.selectedProduct.description} </p>
                                <button className={s2.buttonCarrito} onClick={() => this.handleClickCart(this.props.selectedProduct)}>Agregar al carrito</button>

                            </div>
                        </div> : <h1> Este producto no se encuentra disponible</h1>
                }

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.open}
                        autoHideDuration={2500}
                        onClose={this.handleCloseToast}
                        >
                        <MySnackbarContentWrapper
                            onClose={this.handleCloseToast}
                            variant="success"
                            message="El vino se agrego al carrito!"
                        />
                    </Snackbar>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
	return {
		user: state.user
	};
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		selectSingleProduct: function(producto) {
			dispatch(selectSingleProduct(producto))
		},
		fetchSimilarProducts: function(producto) {
			dispatch(fetchSimilarProducts(producto))
		},
		addProductToOrder: function(product,user){
			dispatch(addProductToOrder(product,user))
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
