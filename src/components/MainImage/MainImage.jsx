import aoeImageUrl from "../../assets/AoE.jpg";
import classes from "./MainImage.module.scss";

const MainImage = () => {
  return (
    <img src={aoeImageUrl} alt="Age of Empires" className={classes.image} />
  );
};

export default MainImage;
