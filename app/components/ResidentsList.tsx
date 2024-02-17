import React, { useState, useEffect } from "react";
import axios from "axios";
import ResidentCard from "./ResidentCard";
import styles from "./styles.module.css";

const ResidentsList = ({ residents }: { residents: any }) => {
  const [residentData, setResidentData] = useState([]);
  useEffect(() => {
    const fetchResidents = async () => {
      const residentRequests = residents.map((url: any) => axios.get(url));
      try {
        const responses = await Promise.all(residentRequests);
        const residentData: any = responses.map((res) => res.data);
        setResidentData(residentData);
      } catch (error) {
        console.error("Error fetching residents:", error);
      }
    };

    fetchResidents();
  }, [residents]);

  return (
    <div className={styles.resident__container}>
      <h6>Residents:</h6>
      {residentData.map((resident: any) => (
        <ResidentCard key={resident.id} resident={resident} />
      ))}
    </div>
  );
};

export default ResidentsList;
