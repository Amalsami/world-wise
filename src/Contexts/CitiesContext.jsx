import React, { createContext, useContext, useEffect, useReducer } from "react";

const CitiesProvider = createContext(null);
const url = "http://localhost:8000";

const initialState = {
  cities: [],
  loading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "isLoading":
      return { ...state, loading: true };
    case "cities/loaded":
      return { ...state, loading: false, cities: action.payload };
    case "city/created":
      return {
        ...state,
        loading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city":
      return { ...state, loading: false, currentCity: action.payload };
    case "city/deleted":
      return {
        ...state,
        loading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "error":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

// eslint-disable-next-line react/prop-types
const CitiesContext = ({ children }) => {
  const [{ cities, loading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "isLoading" });
      try {
        const res = await fetch(`${url}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        console.log(error);
      }
    }
    fetchCities();
  }, []);

  function getCity(id) {
    if (+id === currentCity.id) return;

    async function fetchCity() {
      dispatch({ type: "isLoading" });
      try {
        const res = await fetch(`${url}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city", payload: data });
      } catch (error) {
        console.log(error);
      }
    }
    fetchCity();
  }

  async function postCity(newCity) {
    dispatch({ type: "isLoading" });
    try {
      const res = await fetch(`${url}/cities`, {
        method: "post",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteCity(id) {
    try {
      const res = await fetch(`${url}/cities/${id}`, { method: "delete" });
      await res.json();
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CitiesProvider.Provider
      value={{ cities, loading, currentCity, getCity, postCity, deleteCity }}
    >
      {children}
    </CitiesProvider.Provider>
  );
};

const useCitiesContext = () => {
  const context = useContext(CitiesProvider);
  if (!context)
    throw new Error("useCitiesContext must be used within CitiesContext");
  return context;
};

export { useCitiesContext, CitiesContext };
