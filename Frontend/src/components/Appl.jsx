
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Appl() {
  const [formData, setFormData] = useState({
    name: "",
    batch: "",
    mobile: "",
    email: "",
    address: "",
    education: "",
    userid: "",
    password: "",
    role: "",
    dob: "",
    photo: null,
    document: null,
    emergencyContactNo: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log(`Field: ${name}, Value: ${value}`); // Debugging line

    if (files) {
      setFormData({ ...formData, [name]: files[0] }); // For file inputs
    } else {
      setFormData({ ...formData, [name]: value }); // For other inputs
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();

    // Append all fields, including files (photo and document)
    for (const key in formData) {
      if (formData[key]) {
        formDataObj.append(key, formData[key]);
      }
    }

    // Debugging: Log FormData contents
    for (let [key, value] of formDataObj.entries()) {
      console.log(key, value);
    }

    try {
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        body: formDataObj,
      });

      if (response.ok) {
        setFormData({
          name: "",
          batch: "",
          mobile: "",
          email: "",
          address: "",
          education: "",
          userid: "",
          password: "",
          role: "",
          dob: "",
          photo: null,
          document: null,
          emergencyContactNo: "",
          emergencyContactName: "",
          emergencyContactRelation: "",
        });
        alert("Form submitted successfully!");
      } else {
        alert("Error submitting form");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error with the form submission.");
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center">
      <div className="container bg-white p-4 rounded shadow-lg">
        <h2 className="text-center mb-4">Add Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Name */}
            <div className="col-12 col-md-6 col-lg-4">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            {/* Batch */}
            <div className="col-12 col-md-6 col-lg-4">
              <label className="form-label">Batch</label>
              <input
                type="text"
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            {/* Mobile */}
            <div className="col-12 col-md-6 col-lg-4">
              <label className="form-label">Mobile No.</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            {/* Email */}
            <div className="col-12 col-md-6 col-lg-4">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            {/* Education */}
            <div className="col-12 col-md-6 col-lg-4">
              <label className="form-label">
                Education (For Example: B.E, B.Sc, B.A.)
              </label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            {/* Address */}
            <div className="col-12 col-md-6 col-lg-4">
              <label className="form-label">Address</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            {/* User ID */}
            <div className="col-12 col-md-6 col-lg-4">
              <label className="form-label">User ID</label>
              <input
                name="userid"
                value={formData.userid}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            {/* Password */}
            <div className="col-12 col-md-6 col-lg-4">
              <label className="form-label">Password</label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            {/* Role */}
            <div className="col-12 col-md-6 col-lg-4">
              <label className="form-label">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="select role">Select Role</option>
                <option value="sevak">Sevak</option>
                <option value="group-sevak">Group Sevak</option>
                <option value="samithi">Samithi</option>
              </select>
            </div>

            {/* Emergency Contact Number */}
            <div className="col-12 col-md-6 col-lg-4">
              <label className="form-label">Emergency Contact Number</label>
              <input
                type="text"
                name="emergencyContactNo"
                value={formData.emergencyContactNo}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            {/* Emergency Contact Name */}
            <div className="col-12 col-md-6 col-lg-4">
              <label className="form-label">Emergency Contact Name</label>
              <input
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            {/* Emergency Contact Relation */}
            <div className="col-12 col-md-6 col-lg-4">
              <label className="form-label">Relation with Emergency Contact</label>
              <input
                type="text"
                name="emergencyContactRelation"
                value={formData.emergencyContactRelation}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>


            {/* Date of Birth */}
            <div className="col-12 col-md-6 col-lg-4">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            {/* Photo Upload */}
            <div className="col-12 col-md-6 col-lg-4">
              <label className="form-label">Upload Photo</label>
              <input
                type="file"
                name="photo"
                onChange={handleChange}
                className="form-control"
                accept=".png,.jpg,.jpeg"
                
              />
            </div>

            {/* Document Upload (PAN/Adhar card/Driving License) */}
            <div className="col-12 col-md-6 col-lg-4">
              <label className="form-label">
                Upload Document (PAN/AdharCard)
              </label>
              <input
                type="file"
                name="document"
                onChange={handleChange}
                className="form-control"
                accept=".pdf,.png,.jpg,.jpeg"
                required
              />
            </div>
            
          </div>

          <div className="mt-4 text-end">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Appl;
