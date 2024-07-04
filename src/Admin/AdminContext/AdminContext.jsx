import { useState, createContext, useEffect } from "react";

export const AdminContext = createContext();
const ContextAdmin = ({ children }) => {
  //product
  const [adminData, setAdminData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();

        setAdminData(data);
      } catch (error) {
        console.log("Error!", error);
      }
    };
    fetchData();
  }, []);

  //user
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.log("Error!", error);
      }
    };
    fetchData();
  }, []);
  
  return (
    <AdminContext.Provider value={{ adminData, userData }}>
      {children}
    </AdminContext.Provider>
  );
};

export default ContextAdmin;
