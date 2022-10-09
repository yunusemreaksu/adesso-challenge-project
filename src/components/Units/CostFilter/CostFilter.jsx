import { useState } from "react";
import classes from "./CostFilter.module.scss";

const CostFilter = ({ label, initialValue, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [current, setCurrent] = useState(initialValue);

  const handleChange = (newVal) => {
    setCurrent(newVal);
    onChange(newVal);
  };

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      return handleChange(null);
    }
  };

  return (
    <div>
      <input type="checkbox" onClick={handleCheckbox} />
      <label>{label}</label>
      {isChecked && (
        <div className={classes.slider_container}>
          <input
            type={"range"}
            min={0}
            max={200}
            step={5}
            value={initialValue}
            onChange={(event) => handleChange(event.target.value)}
          />
          <p className={classes.value_counter}>
            {label} value is: <b>{current}</b>
          </p>
        </div>
      )}
    </div>
  );
};

export default CostFilter;
