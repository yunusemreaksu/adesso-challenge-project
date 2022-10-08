import { useSelector } from "react-redux";
import { useParams } from "react-router";
import classes from "../../style/UnitDetails/UnitDetails.module.css";
import Navbar from "../Navbar/Navbar";

const UnitDetails = () => {
  let params = useParams();
  let paramsId = params.id - 1;

  const data = useSelector((state) => state.units.units);

  const details = data.units[paramsId];

  return (
    <>
      <Navbar name={"Unit Details Page"} />
      <div className={classes.main_container}>
        <table>
          <tr>
            <th>ID:</th>
            <td>{details.id}</td>
          </tr>
          <tr>
            <th>Name:</th>
            <td>{details.name}</td>
          </tr>
          <tr>
            <th>Description:</th>
            <td>{details.description}</td>
          </tr>
          <tr>
            <th>Min Required Age:</th>
            <td>{details.age}</td>
          </tr>
          <tr>
            <th>Wood Cost:</th>
            {details.cost !== null ? (
              <td>{details.cost["Wood"]}</td>
            ) : (
              <td></td>
            )}
          </tr>
          <tr>
            <th>Food Cost:</th>
            {details.cost !== null ? (
              <td>{details.cost["Food"]}</td>
            ) : (
              <td></td>
            )}
          </tr>
          <tr>
            <th>Gold Cost:</th>
            {details.cost !== null ? (
              <td>{details.cost["Gold"]}</td>
            ) : (
              <td></td>
            )}
          </tr>
          <tr>
            <th>Build Time:</th>
            <td>{details.build_time}</td>
          </tr>
          <tr>
            <th>Reload Time:</th>
            <td>{details.reload_time}</td>
          </tr>
          <tr>
            <th>Hit Points:</th>
            <td>{details.hit_points}</td>
          </tr>
          <tr>
            <th>Attack:</th>
            <td>{details.attack}</td>
          </tr>
          <tr>
            <th>Accuracy:</th>
            <td>{details.accuracy}</td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default UnitDetails;
