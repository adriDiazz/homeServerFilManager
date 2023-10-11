import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name: string, fileSize: number, date: string) {
  return { name, fileSize, date };
}

const rows = [
  createData("Frozen yoghurt", 159, "22/22/22"),
  createData("Ice cream sandwich", 237, "22/22/22"),
  createData("Eclair", 262, "22/22/22"),
  createData("Cupcake", 305, "22/22/22"),
  createData("Gingerbread", 356, "22/22/22"),
];

export default function LastFilesTable() {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: 850,
          width: "86%",
          backgroundColor: "var(--grey)",
          borderRadius: "8px",
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">File Size</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.fileSize}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
