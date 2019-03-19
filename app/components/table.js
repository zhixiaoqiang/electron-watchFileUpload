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
    overflow: 'scroll',
    maxHeight: '600px'
  },
  table: {
    minWidth: 700,
  },
});

function SimpleTable(props) {
  const { classes, data } = props;

  let rows = data && data.map((item, i) => ({
    i,
    ...item
  }))

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center">操作</TableCell>
            <TableCell align="center">文件路径</TableCell>
            <TableCell align="center">状态</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.i}>
              <TableCell component="th" scope="row" align="center" style={{color: row.color}}>
                {row.state}
              </TableCell>
              <TableCell align="center">{row.text}</TableCell>
              <TableCell align="center">{row.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
