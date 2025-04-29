import React, { useState, useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Button, TextField, Box, Card } from "@mui/material";
import { ScaleLoader } from "react-spinners";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Tooltip, OverlayTrigger } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import api from "./apiConfig"; // Ensure this is correctly configured

import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

function ApplList() {
  const [data, setData] = useState([]); // Original data
  const [filteredData, setFilteredData] = useState([]); // Filtered data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false); // State for delete confirmation modal
  const [userToDelete, setUserToDelete] = useState(null); // Store the user to delete

  // Filter states
  const [nameFilter, setNameFilter] = useState("");
  const [batchFilter, setBatchFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("http://localhost:5000/users"); // Adjust this according to your API endpoint
        console.log(response.data); // Log the data to check the roles
        setData(response.data);
        setFilteredData(response.data); // Initialize filtered data with all users
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle filter changes
  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleBatchFilterChange = (event) => {
    setBatchFilter(event.target.value);
  };

  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value);
  };

  // Filter data based on Name, Batch, and Role
  const filterData = () => {
    let filtered = data;

    if (nameFilter) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (batchFilter) {
      filtered = filtered.filter((item) =>
        item.batch.toLowerCase().includes(batchFilter.toLowerCase())
      );
    }

    if (roleFilter) {
      filtered = filtered.filter(
        (item) =>
          item.role
            .trim()
            .toLowerCase()
            .includes(roleFilter.trim().toLowerCase()) // Clean extra spaces
      );
    }

    setFilteredData(filtered);
  };

  // Clear filters and reset data
  const clearFilters = () => {
    setNameFilter("");
    setBatchFilter("");
    setRoleFilter("");
    setFilteredData(data); // Reset to all data
  };

  // Tooltip for the View Photo button
  const photoTooltip = (props) => (
    <Tooltip id="photo-tooltip" {...props}>
      View Photo
    </Tooltip>
  );

  // Handle showing modal
  const handleShowModal = (item, type) => {
    setSelectedItem({ ...item, type });
    setShowModal(true);
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      if (response.status === 200) {
        // Remove the deleted user from the state
        setData(data.filter((item) => item.id !== id));
        setFilteredData(filteredData.filter((item) => item.id !== id));
        alert("User deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirmation = (item) => {
    setUserToDelete(item); // Set the user to delete
    setDeleteConfirmationModalOpen(true); // Open the confirmation modal
  };

  // Handle confirmed deletion
  const confirmDelete = () => {
    if (userToDelete) {
      handleDelete(userToDelete.id); // Delete the user
      setDeleteConfirmationModalOpen(false); // Close the confirmation modal
      setUserToDelete(null); // Reset the user to delete
    }
  };

  // Handle edit action
  const handleEdit = (item) => {
    setEditFormData(item);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.put(`/users/${editFormData.id}`, editFormData);
      if (response.status === 200) {
        // Update the user in the state
        setData(
          data.map((item) =>
            item.id === editFormData.id ? editFormData : item
          )
        );
        setFilteredData(
          filteredData.map((item) =>
            item.id === editFormData.id ? editFormData : item
          )
        );
        setEditModalOpen(false);
        alert("User updated successfully");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    }
  };

  // Define table columns with Action column
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "batch",
        header: "Batch",
        size: 100,
      },
      {
        accessorKey: "mobile",
        header: "Mobile",
        size: 100,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 180,
      },
      {
        accessorKey: "address",
        header: "Address",
        size: 180,
      },
      {
        accessorKey: "education",
        header: "Education",
        size: 180,
      },
      {
        accessorKey: "dob",
        header: "Date of Birth",
        size: 120,
      },
      {
        accessorKey: "emergencyContactNo",
        header: "Emergency Contact No",
        size: 120,
      },
      {
        accessorKey: "emergencyContactName",
        header: "Emergency Contact Name",
        size: 120,
      },
      {
        accessorKey: "emergencyContactRelation",
        header: "Emergency Contact Relation",
        size: 120,
      },
      {
        accessorKey: "role",
        header: "Role",
        size: 100,
      },
      {
        accessorKey: "photo",
        header: "Photo",
        size: 100,
        Cell: ({ cell }) => (
          <div>
            {cell.getValue() ? (
              <OverlayTrigger placement="top" overlay={photoTooltip}>
                <img
                  src={`data:image/jpeg;base64,${cell.getValue()}`}
                  alt="User Photo"
                  style={{
                    width: "100px",
                    height: "100px",
                    cursor: "pointer",
                    borderRadius: "8px",
                    border: "2px solid #17a2b8",
                    transition: "transform 0.3s ease",
                  }}
                  onClick={() => handleShowModal(cell.row.original, "photo")}
                  className="img-thumbnail"
                />
              </OverlayTrigger>
            ) : (
              "No photo"
            )}
          </div>
        ),
      },
      {
        accessorKey: "document",
        header: "Document",
        size: 100,
        Cell: ({ cell }) => (
          <div>
            {cell.getValue() ? (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleShowModal(cell.row.original, "document");
                }}
                className="btn btn-info btn-sm"
                style={{
                  borderRadius: "5px",
                  backgroundColor: "#17a2b8",
                  color: "white",
                  padding: "8px 16px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <i
                  className="bi bi-file-earmark-pdf"
                  style={{ marginRight: "5px" }}
                ></i>
                View Document
              </a>
            ) : (
              "No document"
            )}
          </div>
        ),
      },
      {
        accessorKey: "action",
        header: "Action",
        size: 150,
        Cell: ({ row }) => (
          <div>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              sx={{ marginRight: 1 }}
              onClick={() => handleEdit(row.original)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleDeleteConfirmation(row.original)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  // Display error message if there's an error
  if (error) {
    return <div className="m-4">Error: {error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Submitted Details</h2>

      {/* Filter Section */}
      <Card
        variant="outlined"
        sx={{ padding: 2, width: "fit-content", marginBottom: 3 }}
      >
        <Box display="flex" alignItems="start" justifyContent="space-between">
          <TextField
            label="Name"
            variant="outlined"
            size="small"
            value={nameFilter}
            onChange={handleNameFilterChange}
            sx={{ marginRight: 1, flexGrow: 1 }}
          />
          <TextField
            label="Batch"
            variant="outlined"
            size="small"
            value={batchFilter}
            onChange={handleBatchFilterChange}
            sx={{ marginRight: 1, flexGrow: 1 }}
          />
          <TextField
            label="Role"
            variant="outlined"
            size="small"
            value={roleFilter}
            onChange={handleRoleFilterChange}
            sx={{ marginRight: 1, flexGrow: 1 }}
          />
          <Box>
            <Button
              variant="contained"
              onClick={filterData}
              size="small"
              sx={{ marginRight: 1 }}
            >
              Filter
            </Button>
            <Button variant="outlined" onClick={clearFilters} size="small">
              Cancel
            </Button>
          </Box>
        </Box>
      </Card>

      {/* Table Section */}
      <div className="agt-tbl-container">
        {loading ? (
          <div className="text-center mt-5 w-100">
            <ScaleLoader className="mx-auto mb-3" loading={loading} size={60} />
            <p>Loading...</p>
          </div>
        ) : (
          <MaterialReactTable columns={columns} data={filteredData} />
        )}
      </div>

      {/* Modal for Zooming Photos/Documents */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedItem?.type === "photo"
              ? "Photo Preview"
              : "Document Preview"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem?.type === "photo" ? (
            <img
              src={`data:image/jpeg;base64,${selectedItem?.photo}`}
              alt="Zoomed Photo"
              style={{ width: "100%", height: "auto" }}
            />
          ) : selectedItem?.document_type === "application/pdf" ? (
            <iframe
              src={`data:application/pdf;base64,${selectedItem?.document}`}
              title="Document Preview"
              style={{ width: "100%", height: "500px" }}
            />
          ) : (
            <img
              src={`data:${selectedItem?.document_type};base64,${selectedItem?.document}`}
              alt="Zoomed Document"
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={deleteConfirmationModalOpen}
        onHide={() => setDeleteConfirmationModalOpen(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{userToDelete?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setDeleteConfirmationModalOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      {/* Edit Modal */}
      <Modal
        show={editModalOpen}
        onHide={() => setEditModalOpen(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEditSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              size="small"
              value={editFormData?.name || ""}
              onChange={(e) =>
                setEditFormData({ ...editFormData, name: e.target.value })
              }
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Batch"
              variant="outlined"
              size="small"
              value={editFormData?.batch || ""}
              onChange={(e) =>
                setEditFormData({ ...editFormData, batch: e.target.value })
              }
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Mobile"
              variant="outlined"
              size="small"
              value={editFormData?.mobile || ""}
              onChange={(e) =>
                setEditFormData({ ...editFormData, mobile: e.target.value })
              }
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Email"
              variant="outlined"
              size="small"
              value={editFormData?.email || ""}
              onChange={(e) =>
                setEditFormData({ ...editFormData, email: e.target.value })
              }
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Address"
              variant="outlined"
              size="small"
              value={editFormData?.address || ""}
              onChange={(e) =>
                setEditFormData({ ...editFormData, address: e.target.value })
              }
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Education"
              variant="outlined"
              size="small"
              value={editFormData?.education || ""}
              onChange={(e) =>
                setEditFormData({ ...editFormData, education: e.target.value })
              }
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Date of Birth"
              variant="outlined"
              size="small"
              value={editFormData?.dob || ""}
              onChange={(e) =>
                setEditFormData({ ...editFormData, dob: e.target.value })
              }
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Emergency Contact No"
              variant="outlined"
              size="small"
              value={editFormData?.emergencyContactNo || ""}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  emergencyContactNo: e.target.value,
                })
              }
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Emergency Contact Name"
              variant="outlined"
              size="small"
              value={editFormData?.emergencyContactName || ""}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  emergencyContactName: e.target.value,
                })
              }
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Emergency Contact Relation"
              variant="outlined"
              size="small"
              value={editFormData?.emergencyContactRelation || ""}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  emergencyContactRelation: e.target.value,
                })
              }
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                value={editFormData?.role || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, role: e.target.value })
                }
              >
                <MenuItem value="Sevak">Sevak</MenuItem>
                <MenuItem value="Group-sevak">Group-sevak</MenuItem>
                <MenuItem value="Samithi">Samithi</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ApplList;
