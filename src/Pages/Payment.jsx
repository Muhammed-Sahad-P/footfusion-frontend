import React from 'react';

const Payment = () => {
  return (
    <div className="max-w-md mx-auto p-4 pt-6 pb-8 bg-white rounded shadow-lg">
      <h2 className="text-lg font-bold mb-4">Payment Information</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="cardNumber">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            className="appearance-none border border-gray-200 rounded w-full py-2 pl-10 text-sm text-gray-700"
            placeholder="Enter card number"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="expMonth">
            Expiration Month
          </label>
          <select
            id="expMonth"
            className="block w-full py-2 pl-10 text-sm text-gray-700"
          >
            <option value="">Select month</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="expYear">
            Expiration Year
          </label>
          <select
            id="expYear"
            className="block w-full py-2 pl-10 text-sm text-gray-700"
          >
            <option value="">Select year</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="cvv">
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            className="appearance-none border border-gray-200 rounded w-full py-2 pl-10 text-sm text-gray-700"
            placeholder="Enter CVV"
          />
        </div>
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Payment;
