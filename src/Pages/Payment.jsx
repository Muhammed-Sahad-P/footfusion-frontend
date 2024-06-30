

const Payment = () => {
  return (
    <div className="max-w-md mx-auto p-4 pt-6 pb-8 bg-white rounded shadow-lg">
      <h2 className="text-lg font-bold mb-4">Payment Information</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="paymentMethod">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            className="block w-full py-2 pl-3 pr-10 text-sm text-gray-700 border border-gray-200 rounded"
          >
            <option value="credit_debit_card">Credit/Debit Card</option>
            <option value="upi">UPI</option>
            <option value="cash_on_delivery">Cash on Delivery</option>
            <option value="emi">EMI</option>
          </select>
        </div>
        
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

        
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Payment;
