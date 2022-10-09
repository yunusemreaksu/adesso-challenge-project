import classes from "./AgeFilter.module.scss";

const AGE_FILTERS = [
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

const AgeFilter = ({ onChange }) => {
  return (
    <div className={classes.main_container}>
      <h4>Ages</h4>
      <div className={classes.button_group}>
        {AGE_FILTERS.map((filter) => (
          <button
            key={filter.value}
            className={classes.button}
            value={filter.value}
            onClick={() => onChange(filter.value)}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AgeFilter;
