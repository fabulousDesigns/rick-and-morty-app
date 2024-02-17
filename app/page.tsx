"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchInput from "./components/SearchInput";
import LocationCard from "./components/LocationCard";
import styles from "./page.module.css";

const Home = () => {
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://rickandmortyapi.com/api/location"
        );
        setLocations(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredLocations = locations.filter((location: any) => {
    return location.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <div className={styles.top__stuff}>
        <div className={styles.nav}>
          <h3 className={styles.title}>Rick & Morty</h3>
          <SearchInput
            placeholder="Search locations..."
            onChange={setSearchTerm}
          />
        </div>
      </div>
      <div className={styles.main__stuff}>
        <div className={styles.location__wrapper}>
          {filteredLocations.map((location: any) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      </div>
      <div className={styles.footer}>
        <p>Made with love by Bernard Maina</p>
      </div>
    </div>
  );
};

export default Home;
