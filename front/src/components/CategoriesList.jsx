import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  // root: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   flexWrap: 'wrap',
  // },
  chip: {
    margin: theme.spacing.unit,
  },
});

function handleDelete() {
  alert('You clicked the delete icon.'); // eslint-disable-line no-alert
}

function OutlinedChips(props) {
  const { classes, allCellars } = props;
	// console.log(allCellars)	
  return (
		<div>
			{
				allCellars[0] && allCellars.map(cellar => {
					return (
						<Chip
							key={ cellar.id }
							label={ cellar.cellarName }
							onDelete={ handleDelete }
							className={ classes.chip }
							color="primary"
							variant="outlined"
						/>
					)
				})
			}
		</div>
	)
}

OutlinedChips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedChips);