import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Plant.css';
import { TPlant } from './api/getPlants';
import { getPlant } from './api/getPlant';
import { TPlantImage, getImages } from './api/getImages';

function Plant() {
  const [plant, setPlant] = useState<TPlant>();
  const [allImages, setAllImages] = useState<TPlantImage[]>([]);
  const { plantId } = useParams();

  async function fetchPlant() {
    const plant = await getPlant(plantId!);
    setPlant(plant);
  }

  const getDevStatus = (stage: number | undefined): string => {
    if (stage === undefined) {
      return 'Unknown';
    }
    switch (stage) {
      case 1:
        return 'Cotyledon';
      case 2:
        return 'Rosetta';
      case 3:
        return 'Heading';
      case 4:
        return 'Harvest';
      default:
        return 'Unknown';
    }
  };

  const getHealthStatus = (status: number | undefined): string => {
    if (status === undefined) {
      return 'Unknown';
    }
    return status === 0 ? 'Unhealthy' : 'Healthy';
  };

  async function fetchImages() {
    const plantImages = await getImages(plantId!);
    setAllImages(plantImages);
  }

  useEffect(() => {
    fetchPlant();
    fetchImages();
  }, [plantId]);

  return (
    <div className="Plant">
      <div>
        <div style={{ textAlign: 'center' }}></div>
        <h2>Development Phase: {getDevStatus(plant?.developmentPhase)}</h2>
        <h2>Health Status: {getHealthStatus(plant?.healthStatus)}</h2>
        <h2>
          Plant Type: {plant?.type}
          <h2></h2> Order: {plant?.order}
        </h2>
      </div>
      <div className="plantImages">
        <ul>
          {allImages.map((plantImage) => (
            <li
              key={plantImage._id}
              className={`plant ${getHealthStatus(plantImage.healthStatus).toLowerCase()}`}
            >
              <div className="image-container">
                <img src={plantImage.url} alt="Plant" />
              </div>
              <text>{new Date(plantImage.date).toLocaleDateString()}</text>
              <text>{new Date(plantImage.date).toLocaleTimeString()}</text>
              <text>Phase: {plantImage.developmentPhase !== undefined ? getDevStatus(plantImage.developmentPhase) : 'N/A'}</text>
              <text>
                {plantImage.healthStatus !== undefined && plantImage.healthStatus !== -1
                  ? getHealthStatus(plantImage.healthStatus)
                  : 'N/A'}
              </text>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Plant;
