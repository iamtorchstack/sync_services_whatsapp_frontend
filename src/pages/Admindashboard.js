import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from 'chart.js/auto';
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  DatePicker,
} from "@mui/material";

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalCustomers: 0,
    totalChats: 0,
    totalMessages: 0,
    slaComplianceRate: 0,
    avgResponseTime: 0,
  });

  const [slaData, setSlaData] = useState({
    labels: ["Gold", "Silver", "Bronze"],
    datasets: [
      {
        label: "SLA Compliance Rate",
        data: [85, 70, 60], // Example data
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
      },
    ],
  });

  const [engineerData, setEngineerData] = useState({
    labels: ["Engineer 1", "Engineer 2", "Engineer 3"],
    datasets: [
      {
        label: "Average Response Time (minutes)",
        data: [10, 15, 20], // Example data
        backgroundColor: "#4CAF50",
      },
    ],
  });

  const [chatVolumeData, setChatVolumeData] = useState({
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Chat Volume",
        data: [100, 150, 200, 250], // Example data
        borderColor: "#FF6384",
        fill: false,
      },
    ],
  });

  const [filters, setFilters] = useState({
    timeRange: "last_30_days",
    slaType: "all",
    engineer: "all",
  });

  useEffect(() => {
    // Fetch metrics and data from the backend
    fetchMetrics();
    fetchSlaData();
    fetchEngineerData();
    fetchChatVolumeData();
  }, [filters]);

  const fetchMetrics = async () => {
    const response = await axios.get("/api/metrics", { params: filters });
    setMetrics(response.data);
  };

  const fetchSlaData = async () => {
    const response = await axios.get("/api/sla-performance", { params: filters });
    setSlaData(response.data);
  };

  const fetchEngineerData = async () => {
    const response = await axios.get("/api/engineer-performance", { params: filters });
    setEngineerData(response.data);
  };

  const fetchChatVolumeData = async () => {
    const response = await axios.get("/api/chat-volume", { params: filters });
    setChatVolumeData(response.data);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Key Metrics Overview */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={2}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">{metrics.totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Customers</Typography>
              <Typography variant="h4">{metrics.totalCustomers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Chats</Typography>
              <Typography variant="h4">{metrics.totalChats}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Messages</Typography>
              <Typography variant="h4">{metrics.totalMessages}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Card>
            <CardContent>
              <Typography variant="h6">SLA Compliance</Typography>
              <Typography variant="h4">{metrics.slaComplianceRate}%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Card>
            <CardContent>
              <Typography variant="h6">Avg Response Time</Typography>
              <Typography variant="h4">{metrics.avgResponseTime}m</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Time Range</InputLabel>
            <Select name="timeRange" value={filters.timeRange} onChange={handleFilterChange}>
              <MenuItem value="last_7_days">Last 7 Days</MenuItem>
              <MenuItem value="last_30_days">Last 30 Days</MenuItem>
              <MenuItem value="last_90_days">Last 90 Days</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>SLA Type</InputLabel>
            <Select name="slaType" value={filters.slaType} onChange={handleFilterChange}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="gold">Gold</MenuItem>
              <MenuItem value="silver">Silver</MenuItem>
              <MenuItem value="bronze">Bronze</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Engineer</InputLabel>
            <Select name="engineer" value={filters.engineer} onChange={handleFilterChange}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="engineer_1">Engineer 1</MenuItem>
              <MenuItem value="engineer_2">Engineer 2</MenuItem>
              <MenuItem value="engineer_3">Engineer 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* SLA Performance */}
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">SLA Compliance by Type</Typography>
              <Bar data={slaData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Response and Resolution Times</Typography>
              <Line data={chatVolumeData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Engineer Performance */}
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Engineer Response Times</Typography>
              <Bar data={engineerData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Customer Engagement */}
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Chat Volume Over Time</Typography>
              <Line data={chatVolumeData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;