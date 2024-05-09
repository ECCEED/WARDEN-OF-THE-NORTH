import React, { useState } from 'react';
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import BasicSelect from '../../components/select_role';
import axios from 'axios';

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [name, setName] = useState();
  const [Lastname, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [contact, setContact] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [role, setRole] = useState('');

  const handleFormSubmit = (e) => {
    const mappedRole = mapRoleToLabel(role);
    e.preventDefault();
    axios.post('http://localhost:7000/form', { name,Lastname, email,contact, password, repeatPassword,role: mappedRole })
    .then((result) => {
      console.log(result.data);
    })
    .catch((err) => {
      if (err.response && err.response.data && err.response.data.error) {
        alert(err.response.data.error);
      } else {
        console.error(err);
        alert('An error occurred. Please try again later.');
      }
    });

  };
  const handleSelectChange = (event) => {
    
    setRole(event.target.value);
  };
  const mapRoleToLabel = (role) => {
    switch (role) {
      case 1:
        return 'Shop_admin';
      case 2:
        return 'Insurance_admin';
      case 3:
        return 'Repair_admin';
      default:
        return '';
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE AGENT" subtitle="Create a New Agent " />

      <form onSubmit={handleFormSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="First Name"
            onChange={(e) => setName(e.target.value)}
            name="firstName"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            name="lastName"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Contact Number"
            onChange={(e) => setContact(e.target.value)}
            name="contact"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="password"
            label="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="password"
            label="repeat password"
            onChange={(e) => setRepeatPassword(e.target.value)}
            name="address2"
            sx={{ gridColumn: "span 4" }}
          />
          <BasicSelect onChange={handleSelectChange} />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Create New Agent
          </Button>
        </Box>
      </form>

      {/* </Formik> */}
    </Box>
  );
};

export default Form;
