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
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl flex justify-center font-bold mb-6 text-gray-800">All Users</h1>

      {loading && (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!loading && !error && (
        <>
          {currentUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">Serial No</th>
                    <th className="border border-gray-300 p-2">ID</th>
                    <th className="border border-gray-300 p-2">Name</th>
                    <th className="border border-gray-300 p-2">Email</th>
                    <th className="border border-gray-300 p-2">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 p-2 text-center">
                        {indexOfFirstUser + index + 1}
                      </td>
                      <td className="border border-gray-300 p-2">{user._id}</td>
                      <td className="border border-gray-300 p-2">
                        {user.fullName}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {user.email}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {user.isAdmin ? "Admin" : "User"}
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
