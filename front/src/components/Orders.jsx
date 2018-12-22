
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import s from '../containers/OrdersContainer/style.css';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    // width: '100%',
    // marginTop: theme.spacing.unit * 3,
    // overflowX: 'auto',
		margin: '1% 2%'
  },
  table: {
    minWidth: 700,
		textAlign : 'center',
		margin : 'auto'
	},
  // row: {
  //   '&:nth-of-type(odd)': {
  //     backgroundColor: theme.palette.background.default,
  //   },
  // },
});

// let id = 0;
// function createData(name, calories, fat, carbs, protein) {
//   id += 1;
//   return { id, name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

function CustomizedTable(props) {
  const { classes, handleChange, orders } = props;
	// console.log(props, ' <==')
  return (
    <Paper className= { classes.root }>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell style={{ textAlign:'center' }}>Órden n°</CustomTableCell>
            <CustomTableCell style={{ textAlign:'center' }}>Fecha</CustomTableCell>
            <CustomTableCell style={{ textAlign:'left' }}>Usuario</CustomTableCell>
            <CustomTableCell style={{ textAlign:'center' }}>Email</CustomTableCell>
            <CustomTableCell style={{ textAlign:'center' }}>Telefono</CustomTableCell>
            <CustomTableCell style={{ textAlign:'center' }}>Estado</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders[0] && orders.map((order,i) => {
						return (
              <TableRow className={classes.row} key={order.nOrder}>
                <CustomTableCell component="th" scope="row">{ order.nOrder }</CustomTableCell>
                <CustomTableCell >{ order.date }</CustomTableCell>
                <CustomTableCell >{ order.user }</CustomTableCell>
                <CustomTableCell >{ order.email }</CustomTableCell>
                <CustomTableCell >{ order.cellphone }</CustomTableCell>
                <CustomTableCell >
									<select id= { order.id } onChange= { handleChange } align= 'right' name="select">
										<option defaultValue= { order.status }>{ order.status }</option> 
										<option value="creada">CREADA</option> 
										<option value="completada">COMPLETADA</option>
										<option value="cancelada">CANCELADA</option>
									</select>
								</CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);