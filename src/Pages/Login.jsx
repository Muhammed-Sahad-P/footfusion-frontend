import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const Login = () => {
  const { isLoggedIn,Login } = useContext(UserContext);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    termsAccepted: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormValues({ ...formValues, [name]: inputValue });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

   
     const result = await Login(formValues)
      if(result.success && !result.admin){
        navigate("/");
        console.log(result.message);

      }else if (result.admin){
        console.log("admin");
        localStorage.setItem("isAdmin", true);
        navigate("/adminhome");
        console.log("result.message");

      }else{
        console.log(result.message);
      }
     

     
    
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    }
    if (!values.termsAccepted) {
      errors.termsAccepted = "You must accept the terms and conditions!";
    }

    return errors;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
            Login
          </h1>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-600 font-medium"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                value={formValues.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 mt-1"
              />
              <p className="text-red-600">{formErrors.email}</p>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-600 font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 mt-1"
              />
              <p className="text-red-600">{formErrors.password}</p>
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
                By continuing, I agree to the
                <span className="text-red-600 cursor-pointer hover:underline">
                  {" "}
                  terms of use{" "}
                </span>
                &amp;
                <span className="text-red-600 cursor-pointer hover:underline">
                  {" "}
                  privacy policy
                </span>
              </p>
            </div>
            <p className="text-red-600">{formErrors.termsAccepted}</p>
            <p className="text-red-600">{formErrors.general}</p>
          </div>
          <button className="w-full bg-red-600 text-white py-3 mt-6 rounded-lg hover:bg-red-700 transition duration-300 text-lg font-medium">
            Continue
          </button>
          <p className="text-center mt-4">
            Don't have an Account?
            <Link
              to="/signup"
              className="text-red-600 cursor-pointer hover:underline"
            >
              {" "}
              Sign Up{" "}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
