import { useEffect } from "react";
import classes from "../../../style/CostFilter/CostFilter.module.css";

const CostFilter = ({ data, woodValue, setWoodValue }) => {
  const filterByWood = (filteredWood) => {
    const filteredByWood =
      data.units !== undefined && data.units !== null
        ? data.units.filter((unit) => unit.cost["Wood"] === filteredWood)
        : console.log(data.units);
    return filteredByWood;
  };

  // if (data.units === null && data.units === undefined) {
  //   console.log("Error");
  // } else {
  //   data.units.map((unit) => console.log(unit.cost));
  // }

  const woodRangeHandler = (event) => {
    setWoodValue(filterByWood(event.target.value));
  };


  return (
    <input
      type={"range"}
      min={0}
      max={200}
      step={5}
      value={woodValue}
      onChange={woodRangeHandler}
    />
  );
};

export default CostFilter;
