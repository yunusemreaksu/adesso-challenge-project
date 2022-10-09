import { Link } from "react-router-dom";
import classes from "./Navbar.module.scss";

const Navbar = ({ name }) => {
  return (
    <nav className={classes.nav_container}>
      <h2 className={classes.header_name}>{name}</h2>
      <div className={classes.link_container}>
        <Link to="/" className={classes.link}>
          HOME
        </Link>
        <Link to="/units" className={classes.link}>
          UNITS
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
