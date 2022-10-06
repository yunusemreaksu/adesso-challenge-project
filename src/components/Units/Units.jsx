import { Box, Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUnitsFetch } from "../../state/units-state";
import classes from "../../style/Units/Units.module.css";
import NavBar from "../NavBar/NavBar";
import AgeFilter from "./AgeFilter/AgeFilter";

const Units = () => {
  const [isWoodChecked, setIsWoodChecked] = useState(false);
  const [isFoodChecked, setIsFoodChecked] = useState(false);
  const [isGoldChecked, setIsGoldChecked] = useState(false);
  const [filteredAges, setFilteredAges] = useState(null);

  const checkWoodHandler = () => {
    setIsWoodChecked(!isWoodChecked);
  };

  const checkFoodHandler = () => {
    setIsFoodChecked(!isFoodChecked);
  };

  const checkGoldHandler = () => {
    setIsGoldChecked(!isGoldChecked);
  };

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 100,
      label: "100",
    },
    {
      value: 200,
      label: "200",
    },
  ];

  const valueText = (value) => {
    return `${value}`;
  };

  const data = useSelector((state) => state.units.units);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUnitsFetch());
  }, [dispatch]);

  useEffect(() => {
    setFilteredAges(data.units);
  }, [data.units]);

  return (
    <>
      <NavBar name={"Units Page"} />
      <div className={classes.main_container}>
        <AgeFilter data={data} setFilteredAges={setFilteredAges} />
        <div>
          <h4>Costs</h4>
          <form>
            <div>
              <input
                type="checkbox"
                id="wood"
                name="wood"
                onClick={checkWoodHandler}
              />
              <label htmlFor="wood">Wood</label>
              {isWoodChecked && (
                <Box sx={{ width: 200 }}>
                  <Slider
                    aria-label="Always visible"
                    defaultValue={100}
                    getAriaValueText={valueText}
                    min={0}
                    max={200}
                    step={5}
                    marks={marks}
                    valueLabelDisplay="on"
                  />
                </Box>
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
                <Box sx={{ width: 200 }}>
                  <Slider
                    aria-label="Always visible"
                    defaultValue={100}
                    getAriaValueText={valueText}
                    min={0}
                    max={200}
                    step={5}
                    marks={marks}
                    valueLabelDisplay="on"
                  />
                </Box>
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
                <Box sx={{ width: 200 }}>
                  <Slider
                    aria-label="Always visible"
                    defaultValue={100}
                    getAriaValueText={valueText}
                    min={0}
                    max={200}
                    step={5}
                    marks={marks}
                    valueLabelDisplay="on"
                  />
                </Box>
              )}
            </div>
          </form>
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
                    <div>
                      {unit.cost !== undefined && unit.cost !== null ? (
                        Object.entries(unit.cost).map(([key, value]) => (
                          <td key={key}>
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
          </table>
        </div>
      </div>
    </>
  );
};

export default Units;
