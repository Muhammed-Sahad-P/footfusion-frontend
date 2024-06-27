import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const initialValues = { fullName: "", email: "", password: "", confirmPassword: "", termsAccepted: false };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormValues({ ...formValues, [name]: inputValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmitted(true);

    if (Object.keys(errors).length === 0) {
      localStorage.setItem('user', JSON.stringify(formValues));
      alert("Signed up successfully");
      navigate('/login');
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitted) {
      console.log(formValues);
    }
  }, [formErrors, isSubmitted, formValues]);

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!values.fullName) {
      errors.fullName = "Full Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters!";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters!";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required!";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match!";
    }
    if (!values.termsAccepted) {
      errors.termsAccepted = "You must accept the terms and conditions!";
    }

    return errors;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formValues.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <p className="text-red-600">{formErrors.fullName}</p>
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formValues.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <p className="text-red-600">{formErrors.email}</p>
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <p className="text-red-600">{formErrors.password}</p>
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formValues.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <p className="text-red-600">{formErrors.confirmPassword}</p>
          </div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              name="termsAccepted" 
              checked={formValues.termsAccepted} 
              onChange={handleChange} 
              className="mr-2" 
            />
            <p className="text-sm text-gray-600">
              By creating an account, I agree to the
              <span className="text-red-600 cursor-pointer hover:underline"> terms of use </span>
              &
              <span className="text-red-600 cursor-pointer hover:underline"> privacy policy</span>.
            </p>
          </div>
          <p className="text-red-600">{formErrors.termsAccepted}</p>
          <button className="w-full bg-red-600 text-white py-2 mt-4 rounded-lg hover:bg-red-700 transition duration-300">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?
          <Link to="/login" className="text-red-600 cursor-pointer hover:underline"> Login here</Link>
        </p>
        {Object.keys(formErrors).length === 0 && isSubmitted ? (
          <div className="text-green-600 text-center mt-4">Registered successfully</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Registration;
