import { Link } from "react-router-dom";
import { PiUserSquareThin } from "react-icons/pi";
import useFetch from "../utils/useFetch";

const UserDetails = () => {
  const { data, isPending, error } = useFetch("http://localhost:3000/users");

  return (
    <>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data && (
        <div className="w-full max-w-3xl mx-auto mt-12 px-4">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-600">
            Users List
          </h1>
          {data.length > 0 ? (
            <div className="grid gap-6">
              {data.map((item, id) => (
                <Link
                  key={id}
                  to={`/admin/user/${item.id}`}
                  className="block transition transform hover:scale-105"
                >
                  <div className="bg-white shadow-lg p-6 rounded-xl flex items-center hover:bg-gray-100 transition duration-300 ease-in-out">
                    <PiUserSquareThin className="h-20 w-20 text-blue-600 mr-6" />
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                        {item.name}
                      </h2>
                      <p className="text-gray-600">{item.email}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 mt-6">No users found.</p>
          )}
        </div>
      )}
    </>
  );
};

export default UserDetails;
