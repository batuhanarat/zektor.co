import  "./hero.scss";
import { images } from "../../../images";

const Hero = () => {
  return (
    <div>
    <div className='hero'>
        <div className='right-top-image'>

        </div>
    <div className='hero__wrapper container'>
        <div className='hero__content'>
            <h1 className='title1'>
            Make
            Farming
            Smarter
            and <br/>Less
            Labor
            Intensive.
            </h1>
            <p className='hero__text'>
                Zektor enhances agricultural
                efficiency and reduces human
                labor in hydroponic farming,
                through image processing, sensor
                technology and artificial
                intelligence.
            </p>
            <button className='btn'> Request Demo</button>
        </div>
        <div className="hero__">
    <picture>
                <source media="(max-width: 767px)"
                srcSet = {images.intro_mobile}/>
                <img src= {images.intro_desktop} alt = " "/>
            </picture>
        </div>
    </div>
    <div className="left-bottom-image">

    </div>
</div>
</div>
  )
}

export default Hero;