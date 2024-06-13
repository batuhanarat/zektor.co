import './team.scss';
import {images} from "../../../images";
import { Link } from 'react-router-dom';

const Team = () => {
  return (
    <div>
        <div className="team">
            <div className="container">
    <h2 className='title1 title1--mod'> Our Team </h2>

    <div className="team__content">

        <div className="volkan">
         <img src={images.volkan} alt="" />
            <h3>Volkan Işık</h3>
            <h4>Co-Founder</h4>
                <Link to={'https://www.linkedin.com/in/volkan-işık-a7479320a/'}>Linkedin</Link>
        </div>

        <div className="batuhan">
            <img src={images.batuhan} alt="" />
            <h3>Batuhan Arat</h3>
            <h4>Co-Founder</h4>
                <Link to={'https://www.linkedin.com/in/batuhanarat/'}>Linkedin</Link>
        </div>

        <div className="yagız">
        <img src={images.yagız} alt="" />
            <h3>Yağız Ellikçi</h3>
            <h4>Co-Founder</h4>
                <Link to={'https://www.linkedin.com/in/yağız-ellikçi-3308ab192/'}>Linkedin</Link>

        </div>



    </div>
            </div>
        </div>
    </div>
  )
}

export default Team;