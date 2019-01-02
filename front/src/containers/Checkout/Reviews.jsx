import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`,
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing.unit * 2,
  },
});

function Review(props) {
  let total = 0;
  const { classes, products } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        ¿Es correcto?
      </Typography>

      <List disablePadding>
        {products.products.map(product => (
          <ListItem className={classes.listItem} key={product.product.id}>
            <ListItemText style={{ 'max-width':'500px' }} primary={`${product.product.productName} (x${product.cantidad})`} secondary={product.product.description} />
            {product.product.cantidad}
            <Typography variant="body2">$ {product.product.price}</Typography>
          </ListItem>
        ))}

        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
          {
            products.products.map(product => {
              total += product.product.price * product.cantidad
            })
          }
            $ {total}
          </Typography>
        </ListItem>
      </List>

      {
        // <Grid container spacing={16}>
        //   <Grid item xs={12} sm={6}>
        //     <Typography variant="h6" gutterBottom className={classes.title}>
        //       Shipping
        //     </Typography>
        //     <Typography gutterBottom>John Smith</Typography>
        //     <Typography gutterBottom>{addresses.join(', ')}</Typography>
        //   </Grid>
        //   <Grid item container direction="column" xs={12} sm={6}>
        //     <Typography variant="h6" gutterBottom className={classes.title}>
        //       Payment details
        //     </Typography>
        //     <Grid container>
        //       {payments.map(payment => (
        //         <React.Fragment key={payment.name}>
        //           <Grid item xs={6}>
        //             <Typography gutterBottom>{payment.name}</Typography>
        //           </Grid>
        //           <Grid item xs={6}>
        //             <Typography gutterBottom>{payment.detail}</Typography>
        //           </Grid>
        //         </React.Fragment>
        //       ))}
        //     </Grid>
        //   </Grid>
        // </Grid>

      }
    </React.Fragment>
  );
}

Review.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Review);