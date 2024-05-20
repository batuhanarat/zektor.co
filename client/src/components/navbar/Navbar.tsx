 import  './navbar.scss'
 import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
 import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
 import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
 import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
 import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

  const Navbar = () => {
   return (
     <div className='navbar'>
        <div className="wrapper">
            <div className="search">
              <input type='text' placeholder='Search...'></input>
              <SearchOutlinedIcon className='icon'/>
            </div>

            <div className="items">

              <div className="item">
              <PublicOutlinedIcon className='icon'/>
                English
              </div>

              <div className="item">
              <NotificationsNoneOutlinedIcon className='icon'/>
                <div className="counter">1</div>
              </div>

              <div className="item">
              <DarkModeOutlinedIcon className='icon'/>
              </div>

              <div className="item">
              <AccountCircleOutlinedIcon className='icon'/>
                User
              </div>



            </div>

          </div>
     </div>
   )
 }

 export default Navbar;
