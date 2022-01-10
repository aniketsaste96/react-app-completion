import {
  Button,
  Typography,
  Box,
  makeStyles,
  TextField,
  Grid,
} from "@material-ui/core";
import { deepPurple, orange } from "@material-ui/core/colors";
import ListUsers from "./ListUsers.js";
import axios from "axios";

import { useFormik } from "formik";
import * as yup from "yup";

import { useState } from "react";
const useStyles = makeStyles({
  headingColor: {
    backgroundColor: deepPurple[900],
    color: "white",
  },
  addStuColor: {
    backgroundColor: "skyblue",
    color: "white",
  },
  stuListColor: {
    backgroundColor: orange[400],
    color: "white",
  },
  tableHeadCell: {
    backgroundColor: "skyblue",
    color: "white",
  },
});

const Users = () => {
  const classes = useStyles();
  const [status, setStatus] = useState();

  //FORM VALIDATION
  const formvalidateSchema = yup.object({
    email: yup
      .string()
      .min(5, "Need a longer email")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        "pattern not matched"
      )
      .required(),
    name: yup.string().required(),
    phone: yup.number().required(),
    address: yup.string().max(40).required(),
  });
  // const [user, setUser] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   address: "",
  // });

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        name: "",
        phone: "",
        address: "",
      },

      onSubmit: (newUser) => {
        onFormSubmit(newUser);
        console.log(newUser);
      },
      validationSchema: formvalidateSchema,
    });

  // function ontextFieldChange(e) {
  //   setUser({
  //     ...user,
  //     [e.target.name]: e.target.value,
  //   });
  //   console.log(user);
  // }

  async function onFormSubmit(newUser) {
    // newUser.preventDefault();

    try {
      await axios.post(
        "https://61c412cff1af4a0017d9927b.mockapi.io/users/",
        newUser
      );
      console.log(newUser);
      setStatus(true);
    } catch (error) {
      console.log("Opps something went wrong!!");
    }
  }

  if (status) {
    return <Users />;
  }

  return (
    <>
      <Box textAlign="center" className={classes.headingColor}>
        <Typography variant="h2">USERS PROFILE</Typography>
      </Box>
      <Grid container justify="center" spacing={4}>
        <Grid item md={4} xs={12}>
          <Box
            textAlign="center"
            m={2}
            p={2}
            className={classes.addStuColor}
            mb={2}
          >
            <Typography variant="h4"> ADD User</Typography>
          </Box>
          <form onSubmit={handleSubmit} id="myForm">
            <Grid container spacing={4} justify="center">
              <Grid item xs={11} sm={11}>
                <TextField
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  error={touched.name && errors.name}
                  helperText={touched.name && errors.name ? errors.name : ""}
                  autoComplete="name"
                  name="name"
                  varient="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={11} sm={11}>
                <TextField
                  //  onChnage={ontextFieldChange} == no cz it calles emmediatly
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={touched.email && errors.email}
                  helperText={touched.email && errors.email ? errors.email : ""}
                  autoComplete="email"
                  name="email"
                  varient="outlined"
                  required
                  fullWidth
                  id="email"
                  label="EMAIL Address"
                  autoFocus
                />
              </Grid>
              <Grid item xs={11} sm={11}>
                <TextField
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  error={touched.phone && errors.phone}
                  helperText={touched.phone && errors.phone ? errors.phone : ""}
                  autoComplete="phone"
                  name="phone"
                  varient="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  autoFocus
                />
              </Grid>
              <Grid item xs={11} sm={11}>
                <TextField
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  error={touched.address && errors.address}
                  helperText={
                    touched.address && errors.address ? errors.address : ""
                  }
                  autoComplete="address"
                  name="address"
                  varient="outlined"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  autoFocus
                />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                form="myForm"
                // onClick={() => onFormSubmit()}
              >
                Add
              </Button>
            </Box>
          </form>
        </Grid>

        <Grid item md={8} xs={12}>
          <ListUsers />
        </Grid>
      </Grid>
    </>
  );
};

export default Users;
