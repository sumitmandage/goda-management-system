import React, { useState, useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Button, TextField, Box, Card } from "@mui/material";
import { ScaleLoader } from "react-spinners";
import api from "./apiConfig"; // Ensure this is correctly configured

const PurchaseList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]);  // State to hold filtered purchases
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("http://localhost:5000/get-attendance"); // Fetch data from the backend
        setPurchases(response.data); // Set the fetched data
        setFilteredPurchases(response.data); // Initialize the filtered purchases
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message); // Set error message
        setLoading(false); // Set loading to false
      }
    };

    fetchData();
  }, []);

  // Handle date filter changes
  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  // Filter data by date range
  const filterByDateRange = () => {
    if (fromDate && toDate) {
      // Convert to Date objects for comparison
      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);

      const filtered = purchases.filter((purchase) => {
        // Convert the API purchase date to Date object
        const purchaseDate = new Date(purchase.date); // Assuming 'date' is in 'yyyy-mm-dd' format
        return purchaseDate >= fromDateObj && purchaseDate <= toDateObj;
      });
      setFilteredPurchases(filtered); // Update the displayed data with filtered results
    }
  };

  // Clear filters and reset data
  const clearFilters = () => {
    setFromDate("");
    setToDate("");
    setFilteredPurchases(purchases); // Reset to original data (all purchases)
  };

  // Define table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "team",
        header: "Team",
        size: 120,
      },
      {
        accessorKey: "date",
        header: "Date",
        size: 100,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
      },
    ],
    []
  );

  // Display error message if there's an error
  if (error) {
    return <div className="m-4">Error: {error}</div>;
  }

  return (
    <div className="m-4">
      <h4 className="title-text">
        <span className="material-symbols-outlined" style={{ fontSize: "1.5rem" }}>
          list_alt
        </span>
        Attendance List
      </h4>

      {/* Date Filter Section */}
      <Card variant="outlined" sx={{ padding: 2, width: "fit-content" }}>
        <Box display="flex" alignItems="start" justifyContent="space-between">
          <TextField
            label="From"
            type="date"
            variant="outlined"
            size="small"
            value={fromDate}
            onChange={handleFromDateChange}
            InputLabelProps={{ shrink: true }}
            sx={{ marginRight: 1, flexGrow: 1 }}
          />
          <TextField
            label="To"
            type="date"
            variant="outlined"
            size="small"
            value={toDate}
            onChange={handleToDateChange}
            InputLabelProps={{ shrink: true }}
            sx={{ marginRight: 1, flexGrow: 1 }}
          />
          <Box>
            <Button variant="contained" onClick={filterByDateRange} size="small" sx={{ marginRight: 1 }}>
              Filter
            </Button>
            <Button variant="outlined" onClick={clearFilters} size="small">
              Cancel
            </Button>
          </Box>
        </Box>
      </Card>

      {/* Data Table */}
      <div className="agt-tbl-container">
        {loading ? (
          <div className="text-center mt-5 w-100">
            <ScaleLoader className="mx-auto mb-3" loading={loading} size={60} />
            <p>Loading...</p>
          </div>
        ) : (
          <MaterialReactTable columns={columns} data={filteredPurchases} />
        )}
      </div>
    </div>
  );
};

export default PurchaseList;
