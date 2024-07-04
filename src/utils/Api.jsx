import  { useEffect,useContext } from 'react';

import { CollectionContext } from '../Context/CollectionContext';

const Api = () => {
    const {setProduct} = useContext(CollectionContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/db");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.log("Error!", error);
      }
    };
    fetchData();
  }, [setProduct]); 

  return (
    <>
    </>
  );
};

export default Api;
