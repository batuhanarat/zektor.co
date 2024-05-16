import { useState ,useEffect} from 'react'
import {useParams } from 'react-router-dom';
import './Plant.css'
import { TPlant } from './api/getPlants';
import { getPlant } from './api/getPlant';
import { TPlantImage, getImages } from './api/getImages';
import plant1Image from './assets/images/1.png';
import plant2Image from './assets/images/2.png';
import plant3Image from './assets/images/3.png';
import plant4Image from './assets/images/4.png';

function Plant() {

  const [plant, setPlant] = useState<TPlant>();
  const [allImages, setAllImages] = useState<TPlantImage[]>([]);
  const {plantId} = useParams();


  async function fetchPlant() {
    const plant = await getPlant(plantId!);
    setPlant(plant);
}

  async function fetchImages() {
    const plantImages = await getImages(plantId!);

    setAllImages(plantImages);
}


  useEffect( () => {
    fetchPlant();
    fetchImages();
}, [plantId]);



return (
    <div className='Plant'>
      <div>
          <div style={{ textAlign: 'center' }}>
        </div>
        <h2> Development Phase : {plant?.developmentPhase}</h2>
        <h2> Health Status : {plant?.healthStatus}</h2>
        <h2> Plant Type: {plant?.type}
        <h2></h2> Order: {plant?.order}</h2>
      </div>
      <div className='plantImages'>
        <ul>
          {allImages.map((plantImage) => (
            <li key={plantImage._id}>

              <text>{new Date(plantImage.date).toLocaleDateString()}</text>
              <text>{new Date(plantImage.date).toLocaleTimeString()}</text>
              <text>Dev Phase: {plantImage.developmentPhase !== undefined ? plantImage.developmentPhase : 'N/A'}</text>
              <text>Health Status: {plantImage.healthStatus !== undefined ? plantImage.healthStatus : 'N/A'}</text>

              <img src={plantImage.url} alt="Plant" />
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default Plant
