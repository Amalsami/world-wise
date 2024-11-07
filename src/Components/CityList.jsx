/* eslint-disable react/prop-types */
import React from "react";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCitiesContext } from "../Contexts/CitiesContext";

export default function CityList() {
  const { loading, cities } = useCitiesContext();
  if (loading) {
    return <Spinner />;
  }
  if (!cities.length) {
    return <Message message={"add your first city"} />;
  }
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
