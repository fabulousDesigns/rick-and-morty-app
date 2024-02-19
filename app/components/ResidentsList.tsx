import React, { useState, useEffect } from "react";
import axios from "axios";
import ResidentCard from "./ResidentCard";
import styles from "./styles.module.css";

const ResidentsList = ({ residents }: { residents: any }) => {
  const [residentData, setResidentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = residentData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={styles.resident__container}>
      <h6>Residents:</h6>
      {currentItems.map((resident: any) => (
        <ResidentCard key={resident.id} resident={resident} />
      ))}
      <div className={styles.pagination}>
        {Array.from({
          length: Math.ceil(residentData.length / itemsPerPage),
        }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResidentsList;
