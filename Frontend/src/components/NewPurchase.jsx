import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import api from "./apiConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewPurchase = () => {
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    department: "",
    mobileNo: "",
    date: "", // Added date field
    items: "",
    modeOfPayment: "", // Changed from itemCode to modeOfPayment
    quantity: "",
    description: "",
    estimateValue: "",
    totalAmount: 0, // Added totalAmount for calculations
    currency: "INR", // Default currency
    paymentDocument: null, // Track uploaded document
  });

  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // If "Mode of Payment" changes, check if we need to show the upload document field
    if (name === "modeOfPayment") {
      setFormData((prevData) => ({
        ...prevData,
        paymentDocument: null, // Reset payment document when changing payment mode
      }));
    }
  };

  const handleEstimateValueChange = (e) => {
    const amount = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      estimateValue: amount,
    }));
    calculateTotalAmount(e.target.value, formData.quantity);
  };

  const handleQuantityChange = (e) => {
    const quantity = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      quantity: quantity,
    }));
    calculateTotalAmount(formData.estimateValue, quantity);
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      paymentDocument: e.target.files[0], // Capture the uploaded file
    }));
  };

  const calculateTotalAmount = (estimateValue, quantity) => {
    const total = parseFloat(estimateValue) * parseInt(quantity);
    setFormData((prevData) => ({
      ...prevData,
      totalAmount: total || 0,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if any required fields are empty
    for (let key in formData) {
      if (formData[key] === "" && key !== "paymentDocument") {
        setAlertType("danger");
        setMessage("Please fill out all required fields.");
        return;
      }
    }
  
    // Check if payment document is required and not provided
    if (
      (formData.modeOfPayment === "Online Payment" || formData.modeOfPayment === "Cheque/Voucher") &&
      !formData.paymentDocument
    ) {
      setAlertType("danger");
      setMessage("Please upload the payment document.");
      return;
    }
  
    try {
      const formDataToSend = new FormData();
  
      // Add all form fields except paymentDocument
      for (let key in formData) {
        if (key !== "paymentDocument") {
          formDataToSend.append(key, formData[key]);
        }
      }
  
      // Add payment document if it exists
      if (formData.paymentDocument) {
        formDataToSend.append("paymentDocument", formData.paymentDocument);
      }
  
      const response = await api.post("/api/Newpurchase", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },  // Important for file uploads
      });
  
      toast.success('Purchasing data has been added successfully');
      setAlertType("success");
      setMessage(response.data.message);
  
      // Reset the form after successful submission
      setFormData({
        Name: "",
        email: "",
        department: "",
        mobileNo: "",
        date: "",
        items: "",
        modeOfPayment: "",
        quantity: "",
        description: "",
        estimateValue: "",
        totalAmount: 0,
        currency: "INR",
        paymentDocument: null,
      });
  
    } catch (error) {
      console.error("There was an error!", error);
      setAlertType("danger");
      toast.error('There was an error submitting the form!');
      setMessage(
        "Error: " +
        (error.response ? error.response.data.message : "Unknown error.")
      );
    }
  };
  

  return (
    <div className="m-3">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <h4 className="title-text">
            <span className="material-symbols-outlined">add_shopping_cart</span>
            New Purchase
          </h4>
        </div>
      </div>

      <Form onSubmit={handleSubmit} className="shadow-form my-3">
        {/* Employee Details Section */}
        <p className="fs-5 fw-bold ">Details</p>
        <Row>
          <Col md={3} className="mb-3">
            <Form.Group controlId="Name">
              <label className="form-label">Name<span className="text-danger">*</span></label>
              <Form.Control
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3} className="mb-3">
            <Form.Group controlId="email">
              <label className="form-label">Email ID<span className="text-danger">*</span></label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3} className="mb-3">
            <Form.Group controlId="department">
              <label className="form-label">Purchase By<span className="text-danger">*</span></label>
              <Form.Control
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3} className="mb-3">
            <Form.Group controlId="mobileNo">
              <label className="form-label">Mobile No<span className="text-danger">*</span></label>
              <Form.Control
                type="text"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <hr />
        {/* Acquisition Details Section */}
        <p className="fs-5 fw-bold ">Acquisition Details</p>

        <Row>
          <Col md={3} className="mb-3">
            <Form.Group controlId="date">
              <label className="form-label">Date Of Purchase<span className="text-danger">*</span></label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3} className="mb-3">
            <Form.Group controlId="items">
              <label className="form-label">Items<span className="text-danger">*</span></label>
              <Form.Control
                type="text"
                name="items"
                value={formData.items}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3} className="mb-3">
            <Form.Group controlId="description">
              <label className="form-label">Items Description<span className="text-danger">*</span></label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required />
            </Form.Group>
          </Col>
          <Col md={3} className="mb-3">
            <Form.Group controlId="modeOfPayment">
              <label className="form-label">Mode of Payment<span className="text-danger">*</span></label>
              <Form.Control
                as="select"
                name="modeOfPayment"
                value={formData.modeOfPayment}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Cash">Cash</option>
                <option value="Online Payment">Online Payment</option>
                <option value="Cheque/Voucher">Cheque/Voucher</option>
              </Form.Control>
            </Form.Group>
          </Col>

          {/* Conditional field for Payment Document */}
          {(formData.modeOfPayment === "Online Payment" || formData.modeOfPayment === "Cheque/Voucher") && (
            <Col md={3} className="mb-3">
              <Form.Group controlId="paymentDocument">
                <label className="form-label">Upload Payment Document<span className="text-danger">*</span></label>
                <Form.Control
                  type="file"
                  name="paymentDocument"
                  onChange={handleFileChange}
                  required={formData.modeOfPayment !== "Cash"}
                />
              </Form.Group>
            </Col>
          )}

          <Col md={3} className="mb-3">
            <Form.Group controlId="quantity">
              <label className="form-label">Quantity<span className="text-danger">*</span></label>
              <Form.Control
                placeholder="Enter Quantity"
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleQuantityChange}
                min="1"
                required
              />
            </Form.Group>
          </Col>

          <Col md={3} className="mb-3">
            <Form.Group controlId="estimateValue">
              <label className="form-label">Estimate Value<span className="text-danger">*</span></label>
              <Form.Control
                type="number"
                placeholder="Amount"
                value={formData.estimateValue || ""}
                onChange={handleEstimateValueChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={3} className="mb-3">
            <Form.Group controlId="totalAmount">
              <label className="form-label">Total Amount</label>
              <Form.Control
                type="text"
                name="totalAmount"
                value={formData.totalAmount || 0}
                disabled
              />
            </Form.Group>
          </Col>

        </Row>

        {/* Submit Button */}
        <div className="text-center">
          <Button type="submit" className="mt-4 submit-button">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default NewPurchase;
