import React, { useState } from "react";
import "./xmodal.css";

const XModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: ""
  });
  const [errors, setErrors] = useState({});

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) {
      newErrors.username = "Username is required.";
    }
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!formData.email.includes("@")) {
      alert("Invalid email. Please check your email address.");
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (formData.phone.length !== 10 || isNaN(formData.phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    }
    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required.";
    } else {
      const today = new Date();
      const selectedDate = new Date(formData.dob);
      if (selectedDate > today) {
        alert("Invalid date of birth. Please select a past date.");
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      closeModal();
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="modal-container">
      <h1 className="heading">User Details Modal</h1>
      <button onClick={openModal} className="modalButton">Open Form</button>
      
      {isOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Fill Details</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <p>{errors.username}</p>}
              </div>

              <div>
                <label>Email Address:</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p>{errors.email}</p>}
              </div>

              <div>
                <label>Phone Number:</label>
                <input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p>{errors.phone}</p>}
              </div>

              <div>
                <label>Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
                {errors.dob && <p>{errors.dob}</p>}
              </div>

              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default XModal;
