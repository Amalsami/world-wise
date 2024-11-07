/* eslint-disable react/jsx-no-undef */
import { useParams, useSearchParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect, useState } from "react";
import { useCitiesContext } from "../Contexts/CitiesContext";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { getCity, currentCity, loading } = useCitiesContext();
  console.log(currentCity);

  useEffect(() => {
    getCity(id);
  }, [id]);

  // const { cityName, emoji, date, notes } = currentCity;
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className={styles.city}>
      {id}: <p>{currentCity?.cityName}</p>
      <p>{currentCity?.emoji}</p>
      <p>{currentCity?.date}</p>
      <p>{currentCity?.notes}</p>
    </div>
  );
}

export default City;
