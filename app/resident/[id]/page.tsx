/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./r.module.css";
import swal from "sweetalert";

const ResidentDetails = ({ params }: { params: { id: string } }) => {
  const [resident, setResident] = useState(null as any);
  const [note, setNote] = useState<any>("");
  const localStorageKey = `resident_${params.id}_note`;
  useEffect(() => {
    const fetchResident = async () => {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/${params.id}`
        );
        setResident(response.data);
        const storedNote = localStorage.getItem(localStorageKey);
        if (storedNote) {
          setNote(storedNote);
        }
      } catch (error) {
        console.error("Error fetching resident:", error);
      }
    };
    if (params.id) {
      fetchResident();
    }
  }, [localStorageKey, params.id]);
  const handleNoteChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNote(e.target.value);
  };
  const handleSaveNote = () => {
    localStorage.setItem(localStorageKey, note);
    swal("Note Saved!", "Your note has been saved!", "success");
    setNote(localStorage.getItem(localStorageKey)); // Update state with the value from local storage
  };
  return (
    <div className={styles.r__wrapper}>
      {resident ? (
        <div className={styles.r__cover}>
          <h3>{resident.name}</h3>
          <img src={resident.image} alt={resident.name} />
          <small>
            <p>
              <strong>Status:</strong> {resident.status}
            </p>
          </small>
          <small>
            <p>
              <strong>Species:</strong> {resident.species}
            </p>
          </small>
          <small>
            <p>
              <strong>Gender:</strong> {resident.gender}
            </p>
          </small>
          <small>
            <p>
              <strong>Origin:</strong> {resident.origin.name}
            </p>
          </small>
          <small>
            <p>
              <strong>Location:</strong> {resident.location.name}
            </p>
          </small>
          {note && (
            <div>
              <h4>Note:</h4>
              <p>
                <small> -- {note} --</small>
              </p>
            </div>
          )}
          <div>
            <h4>Leave a Note:</h4>
            <textarea
              // value={note}
              onChange={handleNoteChange}
              rows={4}
              cols={23}
              style={{ resize: "none", padding: "10px" }}
            />
            <br />
            <button className={styles.btn_save_note} onClick={handleSaveNote}>
              Save Note
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ResidentDetails;
