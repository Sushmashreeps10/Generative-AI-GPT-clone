import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
} from "@mui/material";

const ScifiImage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  //media
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  // states
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState({});
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseFromBackend = await fetch('http://127.0.0.1:5000/scifi-image');
      const jsonData = await responseFromBackend.json();
      setData(jsonData);
    } catch (error) {
      console.log('Error', error);
    }
  };
  //register ctrl
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const data = await axios.post("http://127.0.0.1:5000/scifi-image", { text });
        console.log(data); // Log the entire response for debugging
        setResponse(data.data.response); // Access the 'response' field from data.data
        setText(""); // Clear the text field after submission
    } catch (err) {
        console.log(err);
        if (err.response && err.response.data && err.response.data.error) {
            setError(err.response.data.error);
        } else if (err.message) {
            setError(err.message);
        }
        setTimeout(() => {
            setError("");
        }, 5000);
    }
};

  return (
    <Box
      width={isNotMobile ? "40%" : "80%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3">Scifi Image</Typography>

        <TextField
          placeholder="add your text"
          type="text"
          multiline={true}
          required
          margin="normal"
          fullWidth
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
        >
          Submit
        </Button>
        <Typography mt={2}>
          not this tool ? <Link to="/">GO BACK</Link>
        </Typography>
      </form>

      {response ? (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            height: "500px",
            borderRadius: 5,
            borderColor: "natural.medium",
            bgcolor: "background.default",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
            <img src={response} alt="scifiimage" />
          </Box>
        </Card>
      ) : (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            height: "500px",
            borderRadius: 5,
            borderColor: "natural.medium",
            bgcolor: "background.default",
          }}
        >
          <Typography
            variant="h5"
            color="natural.main"
            sx={{
              textAlign: "center",
              verticalAlign: "middel",
              lineHeight: "450px",
            }}
          >
            Your Scifi Image Will Apprea Here
          </Typography>
        </Card>
      )}
    </Box>
  );
};

export default ScifiImage;
