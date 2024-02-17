"use client";
import React, { useState, useEffect } from "react";
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
  const [residents, setResidents] = useState(initialResidents);

  useEffect(() => {
    if (!initialResidents || initialResidents.length === 0) {
      setLoading(true);
      fetchResidents();
    }
  }, []);

  const fetchResidents = async () => {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/location/${params.locationId}`
      );
      const fetchedResidents = await Promise.all(
        response.data.residents.map((url: any) =>
          axios.get(url).then((res) => res.data)
        )
      );
      setResidents(fetchedResidents);
    } catch (error) {
      console.error("Error fetching residents:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h3 style={{ textAlign: "center", margin: "1rem 0" }}>Residents</h3>
      <div className={styles.resident__container}>
        {residents && residents.length > 0 ? (
          residents.map((resident: any) => (
            <ResidentCard key={resident.id} resident={resident} />
          ))
        ) : (
          <p>No residents found.</p>
        )}
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
