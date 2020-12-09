import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(system, url, custodian) {
  return { system, url, custodian };
}

const rows = [
  createData(
    "WHO Surveillance ",
    "https://analytics.afro.who.int/whouganda",
    "WHO"
  ),
];

export function LinksPanel() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>System</TableCell>
            <TableCell align="right">URL</TableCell>
            <TableCell align="right">Custodian</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.system}>
              <TableCell component="th" scope="row">
                {row.system}
              </TableCell>
              <TableCell align="right">
                <Link href={row.url} target="_blank" rel="noreferrer">
                  {row.url}
                </Link>
              </TableCell>
              <TableCell align="right">{row.custodian}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
