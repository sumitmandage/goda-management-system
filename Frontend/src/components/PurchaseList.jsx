import React, { useState, useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Button, TextField, Box, Card, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ScaleLoader } from "react-spinners";
import api from "./apiConfig"; // Ensure this is correctly configured

const PurchaseList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [openDialog, setOpenDialog] = useState(false); // Modal state
  const [zoomedImage, setZoomedImage] = useState(null); // Store the image to be zoomed

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("http://localhost:5000/api/purchaselist"); // Fetch data from the backend
        setPurchases(response.data); // Set the fetched data
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
      const filtered = purchases.filter((purchase) => {
        const purchaseDate = new Date(purchase.date_of_purchase);
        return purchaseDate >= new Date(fromDate) && purchaseDate <= new Date(toDate);
      });
      setPurchases(filtered); // Update the displayed data
    }
  };

  // Clear filters and reset data
  const clearFilters = () => {
    setFromDate("");
    setToDate("");
    // Reset to the original data (you may need to fetch the data again)
    setLoading(true);
    api.get("http://localhost:5000/api/purchaselist")
      .then((response) => {
        setPurchases(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  };

  // Open zoomed-in image in modal
  const handleViewDocumentClick = (image, imageType) => {
    const imageSrc = `data:${imageType};base64,${image}`;
    setZoomedImage(imageSrc);
    setOpenDialog(true);
  };

  // Close zoomed-in image modal
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setZoomedImage(null);
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
        accessorKey: "email",
        header: "Email",
        size: 200,
      },
      {
        accessorKey: "department",
        header: "Purchase By",
        size: 150,
      },
      {
        accessorKey: "mobile_no",
        header: "Mobile No",
        size: 120,
      },
      {
        accessorKey: "items",
        header: "Items",
        size: 150,
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
        size: 100,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 200,
      },
      {
        accessorKey: "estimate_value",
        header: "Estimate Value",
        size: 120,
      },
      {
        accessorKey: "total_amount",
        header: "Total Amount",
        size: 120,
      },
      {
        accessorKey: "currency",
        header: "Currency",
        size: 100,
      },
      {
        accessorKey: "mode_of_payment",
        header: "Mode of Payment",
        size: 150,
      },
      {
        accessorKey: "date_of_purchase",
        header: "Date of Purchase",
        size: 150,
      },
      {
        accessorKey: "payment_document",
        header: "Payment Document",
        size: 150,
        Cell: ({ row }) => {
          const paymentDocument = row.original.payment_document;
          const paymentDocumentType = row.original.payment_document_type;

          if (paymentDocument && paymentDocumentType.startsWith("image/")) {
            return (
              <Button
                variant="contained"
                size="small"
                onClick={() => handleViewDocumentClick(paymentDocument, paymentDocumentType)}
              >
                View Document
              </Button>
            );
          } else if (paymentDocument) {
            return (
              <a
                href={`data:${paymentDocumentType};base64,${paymentDocument}`}
                download={`payment_document_${row.original.id}`}
                style={{ textDecoration: "none", color: "#2196F3" }}
              >
                Download Document
              </a>
            );
          } else {
            return "No Document";
          }
        },
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
        Purchase List
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
          <MaterialReactTable columns={columns} data={purchases} />
        )}
      </div>

      {/* Modal for Image Zoom */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg">
        <DialogTitle>Zoomed-in Image</DialogTitle>
        <DialogContent>
          {zoomedImage && (
            <img
              src={zoomedImage}
              alt="Zoomed Payment Document"
              style={{ width: "100%", height: "auto", cursor: "zoom-out" }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PurchaseList;
