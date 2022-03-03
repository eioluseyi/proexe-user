import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import UserTable from "../components/UserTable";
import { Link } from "react-router-dom";

export default function UserList() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardActions>
        <Grid justifyContent="space-between" sx={{ m: 1 }} container>
          <Grid item>
            <Typography type="title" color="inherit" fontWeight="bold">
              User List
            </Typography>
          </Grid>

          <Grid item alignSelf="flex-en">
            <Button variant="contained" component={Link} to="/form">
              Add new
            </Button>
          </Grid>
        </Grid>
      </CardActions>
      <CardContent>
        <Card variant="outlined">
          <UserTable />
        </Card>
      </CardContent>
    </Card>
  );
}
