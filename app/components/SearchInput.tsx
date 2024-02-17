import React from "react";
import styles from "./styles.module.css";

const SearchInput = ({
  placeholder,
  onChange,
}: {
  placeholder: any;
  onChange: any;
}) => {
  return (
    <input
      type="text"
      className={styles.form__control}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchInput;
