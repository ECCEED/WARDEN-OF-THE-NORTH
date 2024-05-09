import { useState } from "react";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material"; // Import necessary components from Material-UI

const AddProductForm = () => {
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imgID, setImgID] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        price: price,
        name: name,
        description: description,
        category: category,
        imgID: imgID,
      };

      console.log("data is ", data);

      const response = await axios.post(
        "http://localhost:7000/product/createProduct",
        data
      );

      console.log("response is ", response.data);
    } catch (err) {
      console.log("err adding new product ", err);
    }
  };

  return (
    <Box m="20px">
      <form onSubmit={handleFormSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="Name"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name="Price"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="Category"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="img URL"
            value={imgID}
            onChange={(e) => setImgID(e.target.value)}
            name="imgID"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            sx={{ gridColumn: "span 4" }}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Create New Product
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddProductForm;
