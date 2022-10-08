import classes from "../../../style/AgeFilter/AgeFilter.module.css";

const AgeFilter = ({ data, setFilteredAges }) => {
  const buttons = [
    {
      name: "All",
      value: "All",
    },
    {
      name: "Dark",
      value: "Dark",
    },
    {
      name: "Feudal",
      value: "Feudal",
    },
    {
      name: "Castle",
      value: "Castle",
    },
    {
      name: "Imperial",
      value: "Imperial",
    },
  ];

  const filterUnits = (filteredAge) => {
    const filteredUnits = data.units.filter((unit) => unit.age === filteredAge);
    return filteredUnits;
  };

  const handleAgeClick = (event) => {
    const ageName = event.target.value;
    ageName !== "All"
      ? setFilteredAges(filterUnits(ageName))
      : setFilteredAges(data.units);
  };
  return (
    <div>
      <h4>Ages</h4>
      <div className={classes.button_group}>
        {buttons &&
          buttons.map((button) => (
            <button
              key={button.value}
              className={classes.button}
              value={button.value}
              onClick={handleAgeClick}
            >
              {button.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default AgeFilter;
