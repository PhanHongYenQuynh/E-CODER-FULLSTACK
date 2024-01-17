import React, { createContext, useContext, useState } from 'react';
import { checkingUser } from '../App/Server';

const MyContext = createContext();

export const userContext = () => {
  return useContext(MyContext);
};

export const UserContextProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (email, idCourse) => {
    try {
      setLoading(true);
      // Make your API call here
      const response = await checkingUser(email, idCourse);
        setData(response)
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MyContext.Provider value={{ data, loading, error, fetchData }}>
      {children}
    </MyContext.Provider>
  );
};
