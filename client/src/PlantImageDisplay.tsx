import { useState, useEffect } from 'react';
import { TPlant } from './api/getPlants';
import { getImage } from './api/getImage';
import { TPlantImage } from './api/getImages';

interface PlantImageDisplayProps {
  plant: TPlant;
  socket: WebSocket | null;
}

function PlantImageDisplay({ plant, socket }: PlantImageDisplayProps) {
  const [currentImage, setCurrentImage] = useState<string>('');

  useEffect(() => {
    const fetchImage = async () => {
      const lastImageId = plant.images[plant.images.length - 1];
      if (lastImageId) {
        const image: TPlantImage = await getImage(lastImageId);
        setCurrentImage(image.url);
      }
    };

    fetchImage();
  }, [plant]);

  useEffect(() => {
    const handleNewImage = (event: MessageEvent) => {
      const newImage = JSON.parse(event.data);
      if (newImage.plantId === plant._id) {
        setCurrentImage(newImage.url);
      }
    };

    if (socket) {
      socket.addEventListener('message', handleNewImage);
    }

    return () => {
      if (socket) {
        socket.removeEventListener('message', handleNewImage);
      }
    };
  }, [socket, plant._id]);

  return (
    <div>
      {currentImage && (
        <>
          <img src={currentImage} alt={`Image for ${plant.type}`} width={120} height={110} />
        </>
      )}
    </div>
  );
}

export default PlantImageDisplay;
