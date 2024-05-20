import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Plant from "../../components/plant/Plant";
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
        <div className="plantsSection">
            <Plant/>
        </div>
      </div>
    </div>
  )
}
export default Home;