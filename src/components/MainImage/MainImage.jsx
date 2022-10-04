import aoe_image from "../../assets/AoE.jpg";
import classes from "../../style/MainImage/MainImage.module.css";

const MainImage = () => {
  return <img src={aoe_image} alt="Age of Empires" className={classes.image} />;
};

export default MainImage;
