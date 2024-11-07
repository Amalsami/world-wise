/* eslint-disable react/prop-types */
import React from "react";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCitiesContext } from "../Contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { currentCity, deleteCity } = useCitiesContext();
  const { emoji, cityName, date, id, position } = city;
  function handlDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity?.id && styles[`cityItem--active`]
        }`}
        to={`${id}?lat=${position?.lat}&lng=${position?.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handlDelete}>
          x
        </button>
      </Link>
    </li>
  );
}
