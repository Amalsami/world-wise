/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React from "react";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCitiesContext } from "../Contexts/CitiesContext";

export default function CountryList() {
  const { loading, cities } = useCitiesContext();

  if (loading) {
    return <Spinner />;
  }
  const countries = cities.reduce((arr, city) => {
    if (!arr?.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else return arr;
  }, []);
  if (!countries.length) {
    return <Message message={"add your first city"} />;
  }
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.emoji} />
      ))}
    </ul>
  );
}
