import  './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import YardOutlinedIcon from '@mui/icons-material/YardOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SensorsOutlinedIcon from '@mui/icons-material/SensorsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {Link} from "react-router-dom";

const Sidebar = () => {
 return (
   <div className='sidebar'>
    <div className='top'>
        <Link to = "/" style={{textDecoration: "none"}}>
        <span className='logo'> ZEKTOR </span>
        </Link>
    </div>
    <hr />
    <div className='center'>
        <ul>
            <p className="title">MAIN</p>
            <Link to = "/" style={{textDecoration: "none"}}>

            <li>
            <DashboardIcon className='icon'/>
                <span>Dashboard </span>
            </li>
            </Link>

            <p className="title">LISTS</p>
            <Link to = "/plants" style={{textDecoration: "none"}}>
                <li>
                    <YardOutlinedIcon className='icon'/>
                    <span> Plant List </span>
                </li>
             </Link>
            <p className="title">STATS</p>
            <Link to = "/sensorGraph" style={{textDecoration: "none"}}>
            <li>
                <SensorsOutlinedIcon className='icon'/>
                <span> Sensor Stats  </span>
            </li>
            </Link>
            <p className="title">USER</p>
            <Link to = "/user" style={{textDecoration: "none"}}>
            <li>
                <AccountCircleOutlinedIcon className='icon'/>
                <span> Profile </span>
            </li>
            </Link>
            <Link to = "/logout" style={{textDecoration: "none"}}>

            <li>
                <LogoutOutlinedIcon className='icon'/>
                <span> Logout </span>
            </li>
            </Link>

        </ul>
    </div>


   </div>
 )
}

export default Sidebar;
