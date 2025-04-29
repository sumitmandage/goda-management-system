import React, { useState } from 'react';

const VendorForm = () => {
  const [vendorData, setVendorData] = useState({
    fullName: '',
    shopName: '',
    shopAddress: '',
    mobileNo: '',
    email: '',
    postalCode: '',
    businessType: '',
    gstDocument: '',
    panDocument: '',
    udyogAadhaar: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    assetName: '',
    vendorPhoto: null,
    adharPanCard: null,
    registrationDate: '',
    bankBranch: ''
  });

  // Handling input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVendorData({
      ...vendorData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setVendorData({
      ...vendorData,
      [name]: files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form data (send to API or local storage)
    console.log(vendorData);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Vendor Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4 form-group">
            <label>Vendor Full Name</label>
            <input
              type="text"
              name="fullName"
              className="form-control"
              value={vendorData.fullName}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-4 form-group">
            <label>Vendor Shop Name</label>
            <input
              type="text"
              name="shopName"
              className="form-control"
              value={vendorData.shopName}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-4 form-group">
            <label>Vendor Shop Address</label>
            <input
              name="shopAddress"
              className="form-control"
              value={vendorData.shopAddress}
              onChange={handleInputChange}
            ></input>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 form-group">
            <label>Vendor Mobile No.</label>
            <input
              type="text"
              name="mobileNo"
              className="form-control"
              value={vendorData.mobileNo}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-4 form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={vendorData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-4 form-group">
            <label>Postal Code</label>
            <input
              type="text"
              name="postalCode"
              className="form-control"
              value={vendorData.postalCode}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 form-group">
            <label>Business Type</label>
            <input
              type="text"
              name="businessType"
              className="form-control"
              value={vendorData.businessType}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-4 form-group">
            <label>Asset Name</label>
            <input
              type="text"
              name="assetName"
              className="form-control"
              value={vendorData.assetName}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-4 form-group">
            <label>Registration Date</label>
            <input
              type="date"
              name="registrationDate"
              className="form-control"
              value={vendorData.registrationDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-4 form-group">
            <label>GST Document</label>
            <div className="custom-file">
              <input
                type="file"
                name="gstDocument"
                className="custom-file-input"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="col-md-4 form-group">
            <label>Pan Document</label>
            <div className="custom-file">
              <input
                type="file"
                name="panDocument"
                className="custom-file-input"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="col-md-4 form-group">
            <label>Udyog Aadhaar</label>
            <div className="custom-file">
              <input
                type="file"
                name="udyogAadhaar"
                className="custom-file-input"
                onChange={handleFileChange}
              />
            </div>
          </div>

        </div>

        <div className="row">
          <div className="col-md-4 form-group">
            <label>Vendor Bank Name</label>
            <input
              type="text"
              name="bankName"
              className="form-control"
              value={vendorData.bankName}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-4 form-group">
            <label>Vendor Account Number</label>
            <input
              type="text"
              name="accountNumber"
              className="form-control"
              value={vendorData.accountNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-4 form-group">
            <label>Vendor IFSC Code</label>
            <input
              type="text"
              name="ifscCode"
              className="form-control"
              value={vendorData.ifscCode}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 form-group">
            <label>Bank Branch</label>
            <input
              type="text"
              name="bankBranch"
              className="form-control"
              value={vendorData.bankBranch}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-4 form-group">
            <label>Vendor Photo</label>
            <div className="custom-file">
              <input
                type="file"
                name="vendorPhoto"
                className="custom-file-input"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="col-md-4 form-group">
            <label>Vendor Adhar/PAN Card</label>
            <div className="custom-file">
              <input
                type="file"
                name="adharPanCard"
                className="custom-file-input"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block">Submit Vendor</button>
      </form>
    </div>
  );
};

export default VendorForm;
