import classes from "../../style/Navbar/Navbar.module.css";

const Navbar = ({ name }) => {
  return (
    <nav className={classes.nav_container}>
      <h2 className={classes.header_name}>{name}</h2>
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

export default Navbar;
