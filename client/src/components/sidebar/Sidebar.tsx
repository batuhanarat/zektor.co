import  './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import YardOutlinedIcon from '@mui/icons-material/YardOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SensorsOutlinedIcon from '@mui/icons-material/SensorsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const Sidebar = () => {
 return (
   <div className='sidebar'>
    <div className='top'>
    <span className='logo'> ZEKTOR </span>
    </div>
    <hr />
    <div className='center'>
        <ul>
            <p className="title">MAIN</p>
            <li>
            <DashboardIcon className='icon'/>
                <span>Dashboard </span>
            </li>
            <p className="title">LISTS</p>
            <li>
                <YardOutlinedIcon className='icon'/>
                <span> Plant List </span>
            </li>
            <p className="title">STATS</p>
            <li>
                <SensorsOutlinedIcon className='icon'/>
                <span> Sensor Stats  </span>
            </li>
            <p className="title">USER</p>
            <li>
                <AccountCircleOutlinedIcon className='icon'/>
                <span> Profile </span>
            </li>
            <li>
                <LogoutOutlinedIcon className='icon'/>
                <span> Logout </span>
            </li>
        </ul>
    </div>
    <div className='bottom'>
        <div className='colorOption'> </div>
        <div className='colorOption'> </div>
    </div>

   </div>
 )
}

export default Sidebar;
