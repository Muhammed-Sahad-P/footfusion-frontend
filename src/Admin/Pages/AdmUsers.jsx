import { useEffect, useState } from "react";
import Pagination from "../../Components/Pagination";
import Spinner from "../../Components/Spinner";

const AdmUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("You are not authenticated. Please log in.");
        }

        const response = await fetch("http://localhost:3000/admin/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) =>
      Math.min(prev + 1, Math.ceil(users.length / usersPerPage))
    );
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="p-6 max-w-7xl mx-auto mt-5 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl flex justify-center font-bold mb-8 text-gray-900">
        User Management
      </h1>

      {loading && (
        <div className="flex justify-center items-center h-screen"><Spinner/></div>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!loading && !error && (
        <>
          {currentUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white uppercase text-xs leading-normal">
                    <th className="border border-gray-200 p-4 text-center">
                      #
                    </th>
                    <th className="border border-gray-200 p-4 text-left">
                      ID
                    </th>
                    <th className="border border-gray-200 p-4 text-left">
                      Name
                    </th>
                    <th className="border border-gray-200 p-4 text-left">
                      Email
                    </th>
                    <th className="border border-gray-200 p-4 text-left">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user, index) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition-all duration-200 ease-in-out"
                    >
                      <td className="border border-gray-200 p-4 text-center">
                        {indexOfFirstUser + index + 1}
                      </td>
                      <td className="border border-gray-200 p-4 font-medium text-gray-900">
                        {user._id}
                      </td>
                      <td className="border border-gray-200 p-4">
                        {user.fullName}
                      </td>
                      <td className="border border-gray-200 p-4">
                        {user.email}
                      </td>
                      <td className="border border-gray-200 p-4">
                        <span
                          className={`px-3 py-1 inline-block rounded-full text-xs font-semibold ${
                            user.isAdmin
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {user.isAdmin ? "Admin" : "User"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                itemsPerPage={usersPerPage}
                totalItems={users.length}
                paginate={paginate}
                currentPage={currentPage}
                nextPage={nextPage}
                prevPage={prevPage}
              />
            </div>
          ) : (
            <p className="text-center text-gray-500">No users found</p>
          )}
        </>
      )}
    </div>
  );
};

export default AdmUsers;
