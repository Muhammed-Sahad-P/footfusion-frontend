import { useState } from "react";
import { PiUserSquareThin } from "react-icons/pi";
import useFetch from "../utils/useFetch";

const UserDetails = () => {
  const { data, isPending, error } = useFetch("http://localhost:3000/users");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleViewDetails = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 px-4 ">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {selectedUser ? (
        <div className="bg-white shadow-lg p-6 rounded-xl">
          <button
            onClick={() => setSelectedUser(null)}
            className="text-[#2f75c5] hover:underline mb-4"
          >
            Back to Users List
          </button>
          <h1 className="text-4xl font-extrabold text-center mb-8 text-[#0A2647]">
            {selectedUser.fullName}
          </h1>
          <p className="text-gray-600 mb-4">
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Address:</strong> {" "}
            {selectedUser.address
              ? selectedUser.address.join(", ")
              : "No address found"}
          </p>
          <div className="text-gray-600 mb-4">
            <strong>Orders:</strong>{" "}
            {selectedUser.orders && selectedUser.orders.map((order,index)=>(
              <li key={index}>{order.name} x {order.quantity} </li>
            ))
             }
             {!selectedUser.orders && "No orders found"}
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-extrabold text-center mb-8 text-[#0A2647]">
            Users List
          </h1>
          {data && data.length > 0 ? (
            <div className="grid gap-6">
              {data.map((item, id) => (
                <div
                  key={id}
                  className="block transition transform hover:scale-105"
                >
                  <div className="bg-white shadow-lg p-6 rounded-xl flex items-center hover:bg-gray-100 transition duration-300 ease-in-out">
                    <PiUserSquareThin className="h-20 w-20 text-blue-400 mr-6" />
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                        {item.fullName}
                      </h2>
                      <p className="text-gray-600">{item.email}</p>
                      <button
                        onClick={() => handleViewDetails(item)}
                        className="text-[#0A2647] hover:underline mt-2"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 mt-6">No users found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default UserDetails;
