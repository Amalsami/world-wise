// import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import { AppLayout } from "./pages/AppLayout";
// import AppNav from "./Components/AppNav";
import CityList from "./Components/CityList";
// import { useEffect } from "react";
import CountryList from "./Components/CountryList";
import City from "./Components/City";
import { CitiesContext } from "./Contexts/CitiesContext";
import Form from "./Components/Form";

function App() {
  // const x = 5;
  return (
    <CitiesContext>
      <BrowserRouter>
        <Routes>
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<CityList />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CitiesContext>
  );
}

export default App;
