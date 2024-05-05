import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import axios from 'axios';
import Swal from "sweetalert2";

const Contacts = () => {
  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:7000/contacts");
      const modifiedUserData = response.data.map(user => ({
        ...user,
        id: user._id
      }));
      setUserData(modifiedUserData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:7000/contacts/${userId}`, {
        method: 'DELETE'
      });
      console.log("Deleted: ", response);
      if (response.ok) {
        await fetchData();
        Swal.fire({
          title: "Deleted!",
          text: "Admin has been deleted.",
          icon: "success"
        });
      } else {
        throw new Error('Failed to delete admin');
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the admin.",
        icon: "error"
      });
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row }) => (
        <>
          <Button variant="contained" color="error" onClick={() => handleDelete(row.id)}>
            Delete
          </Button>
          <Button variant="contained" color="primary">
            Edit
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="USERS"
        subtitle="List of The USERS"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={userData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Contacts;
