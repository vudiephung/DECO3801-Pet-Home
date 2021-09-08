import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { Paragraph } from 'react-native-paper';

const useStyles = makeStyles({
  fieldText: {
    fontWeight: 'bold',
  },
});

function createData(field: string, value: string) {
  return { field, value };
}

const rows = [createData('Type', 'type'), createData('Age', 'age')];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.field}>
              <TableCell component="th" scope="row" align="center">
                <Paragraph style={useStyles.fieldText}>{row.field}</Paragraph>
              </TableCell>
              <TableCell align="center">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
