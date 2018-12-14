import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function SimpleTable(props) {

  const { classes, listProducts, handleClick } = props;
	// console.log(listProducts, '  PRODUCTS');
  return (
    <Paper className={classes.root} style={{ margin:'40px 20px' }}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell numeric><h2>ID</h2></TableCell>
            <TableCell><h2>Nombre</h2></TableCell>
            <TableCell><h2>Bodega</h2></TableCell>
            <TableCell><h2>Línea</h2></TableCell>
            <TableCell><h2>Año</h2></TableCell>
            <TableCell numeric><h2>Precio</h2></TableCell>
            <TableCell><h2>Acción</h2></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listProducts && listProducts.map(product => {
            return (
								<TableRow key={product.id}>
									<TableCell numeric>{product.id}</TableCell>
									<TableCell>{product.name}</TableCell>
									<TableCell>{product.cellar}</TableCell>
									<TableCell>{product.line}</TableCell>
									<TableCell>{product.year}</TableCell>
									<TableCell numeric>{product.price}</TableCell>
									<TableCell>
										<button value= {product.id} onClick= {handleClick}>EDITAR</button>
									</TableCell>
								</TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);