import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function PaymentForm(props) {
  return (
    <React.Fragment>
      {
        !props.user.id ? 
        <Typography variant="h5" gutterBottom>
          Por favor necesitamos que ingreses a tu cuenta 
        </Typography>
        :
        <div>
          <Typography variant="h5" gutterBottom>
            ¡Bien! Ya estas a un paso de disfrutar de unos buenos vinos. 
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            Ahora necesitamos pedirte algunos datos personales así nos ponemos en contacto con vos para acordar la entrega.
          </Typography>        
        </div>
      }

    </React.Fragment>
  );
}

export default PaymentForm;
