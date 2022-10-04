import classes from "../../style/NavBar/NavBar.module.css";

const NavBar = ({ name }) => {
  return (
    <nav className={classes.nav_container}>
      <h2>{name}</h2>
      <div className={classes.link_container}>
        <a href="/" className={classes.link}>
          HOME
        </a>
        <a href="/units" className={classes.link}>
          UNITS
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
