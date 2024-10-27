import React, { createContext, useContext, useEffect, useState } from "react";

const CitiesProvider = createContext();
const url = "http://localhost:8000";

// eslint-disable-next-line react/prop-types
const CitiesContext = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState();

  useEffect(function () {
    async function fetchCities() {
      try {
        setLoading(true);
        const res = await fetch(`${url}/cities`);
        const data = await res.json();
        setCities(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);
  function getCity(id) {
    async function fetchCities() {
      try {
        setLoading(true);
        const res = await fetch(`${url}/cities/${id}`);
        const data = await res.json();
        console.log(data);

        setCurrentCity(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }
  async function postCity(newCity) {
    // console.log(new);

    //  function addCitiy() {
    try {
      setLoading(true);
      const res = await fetch(`${url}/cities`, {
        method: "post",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(res);
      console.log(data);

      // setCurrentCity(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    // }
    // addCitiy();
  }
  return (
    <CitiesProvider.Provider
      value={{ cities, loading, currentCity, getCity, postCity }}
    >
      {children}
    </CitiesProvider.Provider>
  );
};
const UseCitiesContext = () => {
  const context = useContext(CitiesProvider);
  return context;
};
export { UseCitiesContext, CitiesContext };
