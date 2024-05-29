import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./single.scss";
import Chart from "../../components/chart/Chart";

export const Single = () => {
  const userId = "66468419b1c6da6f5f91dafd";
  return (
    <div className="sensor">
      <Sidebar />
      <div className="sensorContainer">
        <Navbar />
        <div className="header">Sensor Data</div>
        <div className="sensorSection">
          <Chart userId={userId}/>
        </div>
      </div>
    </div>
  );
};

export default Single;