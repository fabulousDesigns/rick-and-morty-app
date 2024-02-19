"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styles from "./l.module.css";
import ResidentCard from "@/app/components/ResidentCard";

const ResidentsPage = ({
  residents: initialResidents,
  params,
}: {
  residents: any;
  params: {
    locationId: string;
  };
}) => {
  const [loading, setLoading] = useState(false);
  const [residents, setResidents] = useState(initialResidents || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const fetchResidents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/location/${params.locationId}`
      );
      const residents = await Promise.all(
        response.data.residents.map((url: any) =>
          axios.get(url).then((res) => res.data)
        )
      );
      setResidents(residents);
    } catch (error) {
      console.error("Error fetching residents:", error);
      setResidents([]);
    }
    setLoading(false);
  }, [params.locationId]);

  useEffect(() => {
    if (!initialResidents || initialResidents.length === 0) {
      setLoading(true);
      fetchResidents();
    }
  }, [fetchResidents, initialResidents]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = residents.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h3 style={{ textAlign: "center", margin: "1rem 0" }}>Residents</h3>
      <div className={styles.resident__container}>
        {currentItems && currentItems.length > 0 ? (
          currentItems.map((resident: any) => (
            <ResidentCard key={resident.id} resident={resident} />
          ))
        ) : (
          <p>No residents found.</p>
        )}
      </div>
      <div className={styles.pagination}>
        <button
          onClick={() =>
            setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
          }
          className={styles.paginationButton}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          onClick={() =>
            setCurrentPage(
              currentPage < Math.ceil(residents.length / itemsPerPage)
                ? currentPage + 1
                : currentPage
            )
          }
          className={styles.paginationButton}
          disabled={currentPage === Math.ceil(residents.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </>
  );
};

ResidentsPage.getInitialProps = async ({ query }: { query: any }) => {
  const { locationId } = query;
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/location/${locationId}`
    );
    const residents = await Promise.all(
      response.data.residents.map((url: any) =>
        axios.get(url).then((res) => res.data)
      )
    );
    return { residents };
  } catch (error) {
    console.error("Error fetching residents:", error);
    return { residents: [] };
  }
};

export default ResidentsPage;
