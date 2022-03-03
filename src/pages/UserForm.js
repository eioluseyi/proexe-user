import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addUser, editUser } from "../redux/user";
import { createData } from "../helpers";

export default function UserForm() {
  const { selectedUser } = useSelector((state) => state.users);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      id: selectedUser?.id,
      fullName: selectedUser?.name,
      userName: selectedUser?.username,
      email: selectedUser?.email,
      city: selectedUser?.city
    }
  });

  const history = useNavigate();

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    data.id
      ? dispatch(
          editUser(
            createData(
              data.id,
              data.fullName,
              data.userName,
              data.email,
              data.city
            )
          )
        )
      : dispatch(
          addUser(
            createData(
              data.id,
              data.fullName,
              data.userName,
              data.email,
              data.city
            )
          )
        );
    history("/");
  };

  const errorList = {
    required: {
      msg: "This field is required"
    },
    minLength: {
      msg: "Your input needs to be longer"
    },
    maxLength: {
      msg: "We can't take that much words"
    },
    pattern: {
      msg: "This isn't valid yet"
    }
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardActions>
        <Grid justifyContent="space-between" sx={{ m: 1 }} container>
          <Grid item>
            <Typography type="title" color="inherit" fontWeight="bold">
              Form
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
      <CardContent>
        {/* <Card variant="outlined"> */}
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { mb: 2, width: "100%" }
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="Name"
            {...register("fullName", {
              required: true,
              minLength: 3,
              maxLength: 80
            })}
            aria-invalid={errors.fullName ? "true" : "false"}
            helperText={errorList[errors?.fullName?.type]?.msg}
            error={errors.fullName ? true : false}
          />
          <TextField
            label="Username"
            {...register("userName", {
              required: true,
              minLength: 5,
              maxLength: 80
            })}
            aria-invalid={errors.userName ? "true" : "false"}
            helperText={errorList[errors?.userName?.type]?.msg}
            error={errors.userName ? true : false}
          />
          <TextField
            label="Email"
            {...register("email", {
              required: true,
              pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
            })}
            aria-invalid={errors.email ? "true" : "false"}
            helperText={errorList[errors?.email?.type]?.msg}
            error={errors.email ? true : false}
          />
          <TextField
            label="City"
            {...register("city", {
              required: true,
              minLength: 3,
              maxLength: 80
            })}
            aria-invalid={errors.city ? "true" : "false"}
            helperText={errorList[errors?.city?.type]?.msg}
            error={errors.city ? true : false}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              color="error"
              sx={{ marginRight: "10px" }}
              component={Link}
              to="/"
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="success">
              Submit
            </Button>
          </Box>
        </Box>
        {/* </Card> */}
      </CardContent>
    </Card>
  );
}
