import { useCallback, useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUnitsFetch } from "../../state/units-state";
import classes from "./Units.module.scss";
import Navbar from "../Navbar/Navbar";
import AgeFilter from "./AgeFilter/AgeFilter";

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
        woodValue: action.newWoodValue,
      };
    case "food_changed":
      return {
        ...state,
        foodValue: action.newFoodValue,
      };
    case "gold_changed":
      return {
        ...state,
        goldValue: action.newGoldValue,
      };
    default: {
      throw Error("Unknown Action!");
    }
  }
}

const Units = () => {
  const data = useSelector((state) => state.units.units);
  const dispatchFn = useDispatch();

  const [isWoodChecked, setIsWoodChecked] = useState(false);
  const [isFoodChecked, setIsFoodChecked] = useState(false);
  const [isGoldChecked, setIsGoldChecked] = useState(false);

  const [filteredAges, setFilteredAges] = useState(null);

  const [stateCost, dispatchCost] = useReducer(costReducer, initialCostState);

  const [costFilter, setCostFilter] = useState(null);

  const checkWoodHandler = () => {
    setIsWoodChecked(!isWoodChecked);
    if (isWoodChecked === false) {
      return dispatchCost({
        type: "wood_changed",
        newWoodValue: null,
      });
    }
  };

  const checkFoodHandler = () => {
    setIsFoodChecked(!isFoodChecked);
    if (isFoodChecked === false) {
      return dispatchCost({
        type: "food_changed",
        newfoodValue: null,
      });
    }
  };

  const checkGoldHandler = () => {
    setIsGoldChecked(!isGoldChecked);
    if (isGoldChecked === false) {
      return dispatchCost({
        type: "gold_changed",
        newGoldValue: null,
      });
    }
  };

  useEffect(() => {
    dispatchFn(getUnitsFetch());
  }, [dispatchFn]);

  useEffect(() => {
    setFilteredAges(data.units);
  }, [data.units]);

  // Filter by cost logic:
  const filterByCost = useCallback(
    (filteredWood, filteredFood, filteredGold) => {
      // Wood && Food:
      if (
        data.units &&
        filteredWood !== (null || 0) &&
        filteredFood !== (null || 0) &&
        filteredGold === (null || 0)
      ) {
        return data.units
          .filter((unit) => unit.cost)
          .filter(
            (item) =>
              item.cost.Wood === filteredWood && item.cost.Food === filteredFood
          );
      }

      // Wood && Gold:
      if (
        data.units &&
        filteredWood !== (null || 0) &&
        filteredFood === (null || 0) &&
        filteredGold !== (null || 0)
      ) {
        return data.units
          .filter((unit) => unit.cost)
          .filter(
            (item) =>
              item.cost.Wood === filteredWood && item.cost.Gold === filteredGold
          );
      }

      // Food && Gold:
      if (
        data.units &&
        filteredWood === (null || 0) &&
        filteredFood !== (null || 0) &&
        filteredGold !== (null || 0)
      ) {
        return data.units
          .filter((unit) => unit.cost)
          .filter(
            (item) =>
              item.cost.Food === filteredFood && item.cost.Gold === filteredGold
          );
      }

      // Wood only:
      if (
        data.units &&
        filteredWood !== (null || 0) &&
        filteredFood === (null || 0) &&
        filteredGold === (null || 0)
      ) {
        return data.units
          .filter((unit) => unit.cost)
          .filter((item) => item.cost.Wood === filteredWood)
          .filter((i) => Object.keys(i.cost).length === 1);
      }

      // Food only:
      if (
        data.units &&
        filteredWood === (null || 0) &&
        filteredFood !== (null || 0) &&
        filteredGold === (null || 0)
      ) {
        return data.units
          .filter((unit) => unit.cost)
          .filter((item) => item.cost.Food === filteredFood)
          .filter((i) => Object.keys(i.cost).length === 1);
      }

      // Gold only:
      if (
        data.units &&
        filteredWood === (null || 0) &&
        filteredFood === (null || 0) &&
        filteredGold !== (null || 0)
      ) {
        return data.units
          .filter((unit) => unit.cost)
          .filter((item) => item.cost.Gold === filteredGold)
          .filter((i) => Object.keys(i.cost).length === 1);
      }

      // Every cost is 0 || Null
      if (
        data.units &&
        filteredWood === (null || 0) &&
        filteredFood === (null || 0) &&
        filteredGold === (null || 0)
      ) {
        return data.units.filter((unit) => unit.cost === null);
      }
    },
    [data.units]
  );

  useEffect(() => {
    setCostFilter(
      filterByCost(
        +stateCost.woodValue,
        +stateCost.foodValue,
        +stateCost.goldValue
      )
    );
  }, [
    stateCost.woodValue,
    stateCost.foodValue,
    stateCost.goldValue,
    filterByCost,
  ]);

  return (
    <>
      <Navbar name={"Units Page"} />
      <div className={classes.main_container}>
        <AgeFilter data={data} setFilteredAges={setFilteredAges} />
        <div>
          <h4>Costs</h4>
          <p>Units can have at most 2, at least 0 cost types!</p>
          <div>
            <div>
              <input
                type="checkbox"
                id="wood"
                name="wood"
                onClick={checkWoodHandler}
              />
              <label htmlFor="wood">Wood</label>
              {isWoodChecked && (
                <div className={classes.slider_container}>
                  <input
                    type={"range"}
                    min={0}
                    max={200}
                    step={5}
                    value={stateCost.woodValue}
                    onChange={(event) =>
                      dispatchCost({
                        type: "wood_changed",
                        newWoodValue: event.target.value,
                      })
                    }
                  />
                  <p className={classes.value_counter}>
                    Wood value is: <b>{stateCost.woodValue}</b>
                  </p>
                </div>
              )}
            </div>
            <div>
              <input
                type="checkbox"
                id="food"
                name="food"
                onClick={checkFoodHandler}
              />
              <label htmlFor="food">Food</label>
              {isFoodChecked && (
                <div className={classes.slider_container}>
                  <input
                    type={"range"}
                    min={0}
                    max={200}
                    step={5}
                    value={stateCost.foodValue}
                    onChange={(event) =>
                      dispatchCost({
                        type: "food_changed",
                        newFoodValue: event.target.value,
                      })
                    }
                  />
                  <p className={classes.value_counter}>
                    Food value is: <b>{stateCost.foodValue}</b>
                  </p>
                </div>
              )}
            </div>
            <div>
              <input
                type="checkbox"
                id="gold"
                name="gold"
                onClick={checkGoldHandler}
              />
              <label htmlFor="gold">Gold</label>
              {isGoldChecked && (
                <div className={classes.slider_container}>
                  <input
                    type={"range"}
                    min={0}
                    max={200}
                    step={5}
                    value={stateCost.goldValue}
                    onChange={(event) =>
                      dispatchCost({
                        type: "gold_changed",
                        newGoldValue: event.target.value,
                      })
                    }
                  />
                  <p className={classes.value_counter}>
                    Gold value is: <b>{stateCost.goldValue}</b>
                  </p>
                </div>
              )}
            </div>
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
              {filteredAges !== undefined &&
              filteredAges !== null &&
              isWoodChecked === false &&
              isFoodChecked === false &&
              isGoldChecked === false ? (
                filteredAges.map((unit) => (
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
              ) : costFilter &&
                (isWoodChecked === true ||
                  isFoodChecked === true ||
                  isGoldChecked === true) ? (
                costFilter.map((unit) => (
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
