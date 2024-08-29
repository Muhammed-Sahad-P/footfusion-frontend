import  { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CollectionContext } from "../Context/CollectionContext";

const Payment = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const { setCartItems } = useContext(CollectionContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handlePayment = async (event) => {
    event.preventDefault();

    let errors = {};

    if (!mobileNumber) {
      errors.mobileNumber = "Mobile number is required.";
    }
    if (!address) {
      errors.address = "Address is required.";
    }
    if (!name) {
      errors.name = "Name is required.";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setErrors({});

    try {
      const token = localStorage.getItem("token");
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      console.log("Token:", token);
      console.log("Current User:", currentUser);

      const response = await fetch("http://localhost:3000/users/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: currentUser?.user?._id,
          name,
          address,
          mobileNumber,
        }),
        credentials: "include",
      });

      console.log("Response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Order Creation Error:", errorData);
        throw new Error(`Failed to create order: ${errorData.message || "Unknown error"}`);
      }

      const { orderId, amount, currency, key_id } = await response.json();

      // Initialize Razorpay
      const options = {
        key: key_id, // Razorpay key ID from the response
        amount,
        currency,
        name: "FootFusion",
        description: "Order Payment",
        order_id: orderId,
        handler: async (response) => {
          try {
            // Verify payment
            const verifyResponse = await fetch("http://localhost:3000/users/orders/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
              credentials: "include",
            });

            if (!verifyResponse.ok) {
              const verifyErrorData = await verifyResponse.json();
              console.error("Payment Verification Error:", verifyErrorData);
              throw new Error(`Failed to verify payment: ${verifyErrorData.message || "Unknown error"}`);
            }

            alert("Payment successful!");
            setCartItems({});
            navigate("/");
          } catch (error) {
            console.error("Payment Verification Error:", error);
            alert("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name,
        },
        notes: {
          address,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Order Creation Error:", error);
      alert("Failed to create order. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 pt-6 pb-8 bg-white rounded-lg shadow-lg my-10 mt-40">
      <h2 className="text-lg font-poppins mb-4">Payment Information</h2>
      <form>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-poppins text-gray-700 mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className={`block w-full py-2 pl-3 pr-10 text-sm text-gray-700 border ${
              errors.name ? "border-red-500" : "border-gray-200"
            } rounded`}
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="mobileNumber"
            className="block text-sm font-poppins text-gray-700 mb-2"
          >
            Mobile Number
          </label>
          <input
            type="text"
            id="mobileNumber"
            className={`block w-full py-2 pl-3 pr-10 text-sm text-gray-700 border ${
              errors.mobileNumber ? "border-red-500" : "border-gray-200"
            } rounded`}
            placeholder="Enter your mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-poppins text-gray-700 mb-2"
          >
            Address
          </label>
          <textarea
            id="address"
            className={`block w-full py-2 pl-3 pr-10 text-sm text-gray-700 border ${
              errors.address ? "border-red-500" : "border-gray-200"
            } rounded`}
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-700 text-white font-poppins py-2 px-4 rounded"
          onClick={handlePayment}
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Payment;
