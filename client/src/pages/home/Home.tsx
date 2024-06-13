import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Plant from "../../components/plant/Plant";
import Widget from "../../components/widget/Widget";

import "./home.scss"

export const Home = () => {
  return (
    <div className='home'>
      <Sidebar/>
      <div className="homeContainer">
        <Navbar/>
        <div className="widgets">
        <Widget type ="plantTotal" />
        <Widget type = "plantDevelopment"/>
        <Widget type = "sensor"/>
        <Widget type = "developmentInfo"/>
        </div>
        <text className="header">Plants</text >
        <div className="plantsSection">
          <Plant/>
        </div>
      </div>
    </div>
  )
}
export default Home;