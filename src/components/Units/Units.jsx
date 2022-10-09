import { useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUnitsFetch } from "../../state/units-state";
import classes from "./Units.module.scss";
import Navbar from "../Navbar/Navbar";
import AgeFilter from "./AgeFilter/AgeFilter";
import CostFilter from "./CostFilter/CostFilter";

const initialCostState = {
  woodValue: null,
  foodValue: null,
  goldValue: null,
};

function costReducer(state, action) {
  switch (action.type) {
    case "wood_changed":
      return {
        ...state,
        woodValue: action.value,
      };
    case "food_changed":
      return {
        ...state,
        foodValue: action.value,
      };
    case "gold_changed":
      return {
        ...state,
        goldValue: action.value,
      };
    default: {
      throw Error("Unknown Action!");
    }
  }
}

const Units = () => {
  const data = useSelector((state) => state.units.units);
  const dispatchFn = useDispatch();

  const [ageFilter, setAgeFilter] = useState("All");
  const [filteredData, setFilteredData] = useState([]);
  const [costState, dispatchCost] = useReducer(costReducer, initialCostState);
  const { woodValue, foodValue, goldValue } = costState;

  const handleCostFilter = (type, value) => {
    return dispatchCost({
      type,
      value,
    });
  };

  useEffect(() => {
    dispatchFn(getUnitsFetch());
  }, [dispatchFn]);

  useEffect(() => {
    setFilteredData(data.units);
  }, [data.units]);

  useEffect(() => {
    const newData =
      data.units &&
      data.units.filter(
        (unit) =>
          (woodValue && unit.cost && unit.cost.Wood
            ? unit.cost.Wood <= woodValue
            : true) &&
          (foodValue && unit.cost && unit.cost.Gold
            ? unit.cost.Gold <= goldValue
            : true) &&
          (goldValue && unit.cost && unit.cost.Food
            ? unit.cost.Food <= foodValue
            : true) &&
          (ageFilter === "All" || unit.age === ageFilter)
      );
    setFilteredData(newData);
  }, [woodValue, foodValue, goldValue, ageFilter, data.units]);

  return (
    <>
      <Navbar name={"Units Page"} />
      <div className={classes.main_container}>
        <AgeFilter onChange={(val) => setAgeFilter(val)} />
        <div>
          <h4>Costs</h4>
          <p>Units can have at most 2, at least 0 cost types!</p>
          <div>
            <CostFilter
              initialValue={woodValue}
              label="Wood"
              onChange={(val) => handleCostFilter("wood_changed", val)}
            ></CostFilter>
            <CostFilter
              initialValue={foodValue}
              label="Food"
              onChange={(val) => handleCostFilter("food_changed", val)}
            ></CostFilter>
            <CostFilter
              initialValue={goldValue}
              label="Gold"
              onChange={(val) => handleCostFilter("gold_changed", val)}
            ></CostFilter>
          </div>
        </div>
        <div>
          <h4>Units List</h4>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Costs</th>
              </tr>
            </thead>
            <tbody>
              {filteredData ? (
                filteredData.map((unit) => (
                  <tr key={unit.id}>
                    <td>{unit.id}</td>
                    <td>
                      <Link to={`/unitdetails/${unit.id}`}>{unit.name}</Link>
                    </td>
                    <td>{unit.age}</td>
                    <div className={classes.cost_cell_container}>
                      {unit.cost !== undefined && unit.cost !== null ? (
                        Object.entries(unit.cost).map(([key, value]) => (
                          <td key={key} className={classes.cost_cell}>
                            {key + ": "}
                            {value}
                          </td>
                        ))
                      ) : (
                        <p>No cost data to show!</p>
                      )}
                    </div>
                  </tr>
                ))
              ) : (
                <td className={classes.not_found_warning}>
                  No unit type found matching the selected parameters!
                </td>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Units;
