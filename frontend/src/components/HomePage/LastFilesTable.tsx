import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import { formatFileName, formatFileSize } from "../../utils/fileHandler";

interface fileData {
  name: string;
  date: string;
  fileSize: number;
  isDirectory: boolean;
}

export default function LastFilesTable({ files, allClosed }) {
  const { data, fetchData, error, loading } = useFetch<fileData[]>();

  useEffect(() => {
    fetchData(import.meta.env.VITE_LATEST_URL);
  }, [allClosed]);

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
          {data?.map((row) => {
            const date = new Date(row.date);
            const finalDate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
            return (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <img src="folderMini.png" alt="" />
                    {formatFileName(row.name)}
                  </div>
                </TableCell>
                <TableCell align="right">
                  {formatFileSize(row.fileSize)}
                </TableCell>
                <TableCell align="right">{finalDate}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
