// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import { useUrlParams } from "../Hooks/useUrlParams";
import Message from "./Message";
import Spinner from "./Spinner";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { UseCitiesContext } from "../Contexts/CitiesContext";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import BackButton from "./BackButton";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client?";
function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useUrlParams();
  const { postCity, loading } = UseCitiesContext();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [cityLoading, setCityLoading] = useState(false);
  const [maprror, setMapError] = useState("");
  const [emoji, setEmoji] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCity() {
      try {
        setCityLoading(true);
        setMapError("");
        const res = await fetch(`${BASE_URL}latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        console.log(data);
        if (!data.countryCode) {
          throw new Error(
            "that doesn't like a city, please click some where else"
          );
        }
        setEmoji(convertToEmoji(data.countryCode));
        setCityName(data?.city || data.locality);
        setCountry(data.countryName);
      } catch (error) {
        setMapError(error.message);
        console.log(error.message);
      } finally {
        setCityLoading(false);
      }
    }
    fetchCity();
  }, [lat, lng]);
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await postCity(newCity);
    navigate("/app/cities");
  }
  if (maprror) {
    return <Message message={maprror}></Message>;
  }
  if (cityLoading) {
    return <Spinner />;
  }
  return (
    <form
      className={`${styles.form} ${loading && styles.loading}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>

        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => }
          value={date}
        /> */}
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat={"dd/MM/YYY"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {country}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
