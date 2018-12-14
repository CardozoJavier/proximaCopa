import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function AddressForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Necesitamos que por favor nos completes estos datos:
      </Typography>

      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="tel"
            name="tel"
            label="Telefono"
            fullWidth
            autoComplete="tel"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Domicilio"
            fullWidth
            autoComplete="billing address-line1"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Ciudad"
            fullWidth
            autoComplete="billing address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="Provincia" fullWidth />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default AddressForm;