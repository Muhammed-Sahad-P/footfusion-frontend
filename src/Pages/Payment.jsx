import { useState } from 'react';
import { useNavigate} from 'react-router-dom';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handlePayment = (event) => {
    event.preventDefault();

    let errors = {};

    if (!paymentMethod) {
      errors.paymentMethod = 'Payment method is required.';
    }
    if (!cardNumber) {
      errors.cardNumber = 'Card number is required.';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      setErrors({});
      alert('Payment successful!');
      navigate('/')
    }
  };

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
            className={`block w-full py-2 pl-3 pr-10 text-sm text-gray-700 border ${errors.paymentMethod ? 'border-red-500' : 'border-gray-200'} rounded`}
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select a payment method</option>
            <option value="credit_debit_card">Credit/Debit Card</option>
            <option value="upi">UPI</option>
            <option value="cash_on_delivery">Cash on Delivery</option>
            <option value="emi">EMI</option>
          </select>
          {errors.paymentMethod && (
            <p className="text-red-500 text-xs mt-1">{errors.paymentMethod}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="cardNumber">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            className={`appearance-none border ${errors.cardNumber ? 'border-red-500' : 'border-gray-200'} rounded w-full py-2 pl-10 text-sm text-gray-700`}
            placeholder="Enter card number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePayment}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Payment;
