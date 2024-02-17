/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";

const ResidentCard = ({ resident }: { resident: any }) => {
  return (
    <Link href={`/resident/${resident.id}`}>
      <div style={{ cursor: "pointer" }} className={styles.r__card}>
        <div className={styles.prof__img}>
          <img src={resident.image} alt={resident.name} />
        </div>
        <div>
          <h5>{resident.name}</h5>
          <small>
            <p>
              {" "}
              <strong>status:</strong> {resident.status}
            </p>
          </small>
          <small>
            <p>
              {" "}
              <strong>gender:</strong> {resident.gender}
            </p>
          </small>
        </div>
      </div>
    </Link>
  );
};

export default ResidentCard;
