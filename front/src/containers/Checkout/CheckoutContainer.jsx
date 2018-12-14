import React from 'react';
import { connect } from 'react-redux'

//Material UI:
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AdressForm';
import PaymentForm from './PaymentForm';
import Review from './Reviews';
import { styles } from './styles'
import { sendEmail } from '../../store/actions/OrderActions';
import { Link } from 'react-router-dom';

const steps = ['Instrucciones', 'Datos personales', 'Revisar pedido'];

class Checkout extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			activeStep: 0,
		};
		this.sendEmail= this.sendEmail.bind(this)
	}

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  getStepContent(step) {
    switch (step) {
      case 0:
      return <PaymentForm user={this.props.user}/>;
      case 1:
      return <AddressForm />;
      case 2:
        return <Review products={this.props.order}/>;
      default:
        throw new Error('Unknown step');
    }
  }

	sendEmail(e){
		// console.log(this.props.user)
		// console.log(this.props.order)
		this.props.contactEmail(this.props.user,this.props.order)
		this.handleNext();
	}

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Confirmación de pedido
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    ¡Listo! Gracias por tu pedido.
                  </Typography>
                  <Typography variant="subtitle1">
                    Tu número de pedido es el XXXX. En breve nos comunicaremos con vos para acordar la entrega.
                    Cualquier cosa nos podes escribir a "pogo@pogo.pogo"
                  </Typography>
									<Link to='/'>
										<Button variant="contained" color="primary" className={classes.button} >
											Back to shopping 
										</Button>
									</Link>
								</React.Fragment>
              ) : (
                <React.Fragment>
                  {this.getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}>
                        Atras
                      </Button>
                    )}

                    {
                      this.props.user.id &&
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={activeStep === steps.length - 1 ? this.sendEmail : this.handleNext}
                          className={classes.button}
                        >
                        {activeStep === steps.length - 1 ? '¡Es correcto!' : 'Siguiente'}
                        </Button>
                    }
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
  return{ 
      order: state.order,
      user: state.user
    }
};

function mapDispatchToProps(dispatch){
  return{ 
		contactEmail: (user, order) => {
			dispatch(sendEmail(user, order))
		}
  //   logoutUser: ()=>{
  //     dispatch(logoutUser())
  // },
  //   getProductsBySearchNavbar:(nombre)=> {
  //     dispatch(getProductsBySearchNavbar(nombre))
  //   },
  }
};



export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Checkout))

// export default ;
