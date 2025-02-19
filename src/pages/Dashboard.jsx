import PropTypes from "prop-types";
import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Tabs,
  Tab,
  Container,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => (
  <Card sx={{ mb: 2, "&:hover": { boxShadow: 6 } }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {user.name}
      </Typography>
      <Typography color="textSecondary">Email: {user.email}</Typography>
      <Typography color="textSecondary">Address: {user.address}</Typography>
      <Typography color="textSecondary">Status: {user.status}</Typography>
      {/* Add more user details as needed */}
    </CardContent>
  </Card>
);

UserCard.propTypes = {
  user: PropTypes.shape({
    address: PropTypes.any,
    email: PropTypes.any,
    name: PropTypes.any,
    status: PropTypes.any,
  }),
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  // Mock data - replace with actual API call
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      address: "123 Main St",
      status: "Pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      address: "456 Oak Ave",
      status: "Verified",
    },
    // Add more mock data as needed
  ]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filterUsers = () => {
    switch (tabValue) {
      case 1:
        return users.filter((user) => user.status === "Pending");
      case 2:
        return users.filter((user) => user.status === "Verified");
      default:
        return users;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AKS ADMIN PANEL
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          sx={{ mb: 4 }}
        >
          <Tab label="All Requests" />
          <Tab label="Pending" />
          <Tab label="Verified" />
        </Tabs>

        <Grid container spacing={3}>
          {filterUsers().map((user) => (
            <Grid item xs={12} md={6} lg={4} key={user.id}>
              <UserCard user={user} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
