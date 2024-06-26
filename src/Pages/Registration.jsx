import React from "react";

const Registration = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <p className="text-sm text-gray-600">
              By creating an account, I agree to the
              <span className="text-red-600 cursor-pointer hover:underline">
                {" "}
                terms of use{" "}
              </span>
              &
              <span className="text-red-600 cursor-pointer hover:underline">
                {" "}
                privacy policy
              </span>
              .
            </p>
          </div>
          <button className="w-full bg-red-600 text-white py-2 mt-4 rounded-lg hover:bg-red-700 transition duration-300">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?
          <span className="text-red-600 cursor-pointer hover:underline">
            {" "}
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Registration;
