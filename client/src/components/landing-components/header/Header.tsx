import { useState, MouseEvent } from 'react';
import "./header.scss";
import { images } from "../../../images";
import { Link } from 'react-router-dom';

const Header = () => {

    const [open,setOpen] = useState(false);

    const handleClick = (e: MouseEvent<HTMLImageElement>) => {
        e.preventDefault();
        setOpen(!open);
    };




  return (
    <div className='header'>
        <header>
    <div className="navbar-container">
        <div className="logo">
            <img src={images.zektorlogo} alt ="" />
        </div>
    <ul className={open ? 'nav-items active' : 'nav-items'}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/team">Team</Link></li>
        <li>Contact</li>
        <li className='btn btn--nav-btn'> Request Demo</li>
    </ul>
    <div className='hamburger'>
        <img src={images.hamburger} alt='' onClick={handleClick}/>
    </div>
</div>
</header>
    </div>
  )
}

export default Header