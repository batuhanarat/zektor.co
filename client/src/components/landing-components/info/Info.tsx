import './info.scss';
import {images} from "../../../images";

const Info = () => {
  return (
    <div>
        <div className="value-proposition">
            <div className="container">
    <h2 className='title1 title1--mod'> Why Zektor? </h2>

    <div className="value-proposition__content">

        <div className="monitoring">
            <img src={images.monitor} alt="" />
            <h3>Vertical
                Farming <br/>
                Monitoring</h3>
                <p> Monitor your farm.</p>
        </div>

        <div className="image-gathering">
            <img src={images.capture} alt="" />
            <h3>Automated
                Image <br/>
                Gathering System</h3>
                <p> Our hardware captures every plants images automatically.</p>
        </div>

        <div className="prediction">
            <img src={images.ai} alt="" />
            <h3>Plant Health
                and <br/> Growth
                Prediction </h3>
                <p>AI decides on plant's health status and growth rate.</p>
        </div>

        <div className="ui">
            <img src={images.ui} alt="" />
            <h3>User
                Friendly <br/> Dashboard</h3>
                <p>Results showed on user friendly interface.</p>
        </div>

    </div>
            </div>
        </div>
    </div>
  )
}

export default Info