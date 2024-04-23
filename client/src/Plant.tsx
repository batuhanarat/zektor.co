import { useState ,useEffect} from 'react'
import {useParams } from 'react-router-dom';
import './Plant.css'
import { TPlant } from './api/getPlants';

import { getPlant } from './api/getPlant';
import { TPlantImage, getImages } from './api/getImages';



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
function handleImageDecoding(base64Image:string) {
    // Assuming the base64Image is a PNG image. If not, change the MIME type accordingly.
    return `data:image/png;base64,${base64Image}`;
  }


  useEffect( () => {
    fetchPlant();
    fetchImages();
}, [plantId]);



return (
    <div className='Plant'>
      <div>
        <h2>Plant ID: {plant?._id}</h2>
        <h2> Plant Type: {plant?.type}
        <h2></h2> Order: {plant?.order}</h2>
      </div>
      <div className='plantImages'>
        <ul>
          {allImages.map((plantImage) => (
            <li key={plantImage._id}>
              <text>{new Date(plantImage.date).toLocaleDateString()}</text>
              <text>{new Date(plantImage.date).toLocaleTimeString()}</text>
              <img src={handleImageDecoding(plantImage.image)} alt="Plant" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Plant
