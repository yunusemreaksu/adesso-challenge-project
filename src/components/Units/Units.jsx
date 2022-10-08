import { useCallback, useEffect, useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUnitsFetch } from "../../state/units-state";
import classes from "../../style/Units/Units.module.css";
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
  };

  const checkFoodHandler = () => {
    setIsFoodChecked(!isFoodChecked);
  };

  const checkGoldHandler = () => {
    setIsGoldChecked(!isGoldChecked);
  };

  useEffect(() => {
    dispatchFn(getUnitsFetch());
  }, [dispatchFn]);

  useEffect(() => {
    setFilteredAges(data.units);
  }, [data.units]);

  // Filter by Cost logic ile user input birleşimi
  const filterByCost = useCallback(
    (filteredWood, filteredFood, filteredGold) => {
      const filteredByCost =
        data.units && filteredWood && filteredFood
          ? data.units
              .filter((unit) => unit.cost)
              .filter(
                (item) =>
                  item.cost.Wood === filteredWood &&
                  item.cost.Food === filteredFood
              )
          : data.units && filteredWood && filteredGold
          ? data.units
              .filter((unit) => unit.cost)
              .filter(
                (item) =>
                  item.cost.Wood === filteredWood &&
                  item.cost.Gold === filteredGold
              )
          : data.units && filteredFood && filteredGold
          ? data.units
              .filter((unit) => unit.cost)
              .filter(
                (item) =>
                  item.cost.Food === filteredFood &&
                  item.cost.Gold === filteredGold
              )
          : data.units &&
            filteredWood &&
            filteredFood === null &&
            filteredGold === null
          ? data.units
              .filter((unit) => unit.cost)
              .filter((item) => item.cost.Wood === filteredWood)
          : data.units &&
            filteredWood === null &&
            filteredFood &&
            filteredGold === null
          ? data.units
              .filter((unit) => unit.cost)
              .filter((item) => item.cost.Food === filteredFood)
          : data.units &&
            filteredWood === null &&
            filteredFood === null &&
            filteredGold
          ? data.units
              .filter((unit) => unit.cost)
              .filter((item) => item.cost.Gold === filteredGold)
          : data.units &&
            filteredWood === null &&
            filteredFood === null &&
            filteredGold === null
          ? data.units.filter((unit) => unit.cost === null)
          : null;

      return filteredByCost;
    },
    [data.units]
  );

  console.log(filterByCost(40, null, 70));

  console.log(+stateCost.woodValue);

  // useEffect(() => {
  //   console.log(
  //     filterByCost(
  //       stateCost.woodValue,
  //       stateCost.foodValue,
  //       stateCost.goldValue
  //     )
  //   );
  // }, [
  //   stateCost.woodValue,
  //   stateCost.foodValue,
  //   stateCost.goldValue,
  //   filterByCost,
  // ]);

  // console.log(
  //   filterByCost(stateCost.woodValue, stateCost.foodValue, stateCost.goldValue)
  // );

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

  // Bu useEffect olmazsa slider her kaydığında value'dan önce undefined basıyor
  // useEffect(() => {
  //   setWoodValue(woodValue);
  // }, [woodValue]);

  // // Bunda yine de undefined basıyor
  // useEffect(() => {
  //   setFoodValue();
  // }, []);

  // useEffect(() => {
  //   setGoldValue();
  // }, []);

  return (
    <>
      <Navbar name={"Units Page"} />
      <div className={classes.main_container}>
        <AgeFilter data={data} setFilteredAges={setFilteredAges} />
        <div>
          <h4>Costs</h4>
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
                <div>
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
                  <p>Wood value is: {stateCost.woodValue}</p>
                  {costFilter &&
                    costFilter.map((item) => <p key={item.id}>{item.name}</p>)}
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
                <div>
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
                  <p>Food value is: {stateCost.foodValue}</p>
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
                <div>
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
                  <p>Gold value is: {stateCost.goldValue}</p>
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
              {filteredAges !== undefined && filteredAges !== null ? (
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
              ) : (
                <td>Error!</td>
              )}
            </tbody>
            <div>
              <p>costFilter:</p>
              {costFilter &&
                costFilter.map((item) => <p key={item.id}>{item.name}</p>)}
            </div>
          </table>
        </div>
      </div>
    </>
  );
};

export default Units;
