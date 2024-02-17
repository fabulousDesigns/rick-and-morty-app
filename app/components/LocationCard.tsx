import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Link from "next/link";
// import ResidentCard from "./ResidentCard";
import styles from "./location.module.css";
// import ResidentsList from "./ResidentsList";
import { useRouter } from "next/navigation";

const LocationCard = ({ location }: { location: any }) => {
  const [residents, setResidents] = useState([] as any[]);
  const [showResidents, setShowResidents] = useState(false);
  const router = useRouter();

  const handleShowResidents = () => {
    router.push(`/location/${location.id}`);
  };

  // useEffect(() => {
  //   const fetchResidents = async () => {
  //     const residentRequests = location.residents.map((url: string) =>
  //       axios.get(url)
  //     );
  //     try {
  //       const responses = await Promise.all(residentRequests);
  //       const residentData = responses.map((res) => res.data);
  //       setResidents(residentData);
  //     } catch (error) {
  //       console.error("Error fetching residents:", error);
  //     }
  //   };

  //   if (showResidents) {
  //     fetchResidents();
  //   }
  // }, [location.residents, showResidents]);

  return (
    <div className={styles.card}>
      <div className="card-body">
        <div className="l__title">
          <h6 className="card-title">{location.name}</h6>
        </div>
        <div className="l__type">
          <h6 className="card-subtitle mb-2 text-muted">{location.type}</h6>
        </div>
        <div className="r__resident">
          <small>
            <p className="card-text">
              {" "}
              <strong>Residents:</strong> {location.residents.length}
            </p>
          </small>
        </div>
        <button
          className={styles.btn__show__residents}
          onClick={handleShowResidents}
        >
          Show Residents
        </button>
        {/* {showResidents ? "Hide Residents" : "Show Residents"}
        </button>
        {showResidents && <ResidentsList residents={location.residents} />} */}
      </div>
    </div>
  );
};

export default LocationCard;
