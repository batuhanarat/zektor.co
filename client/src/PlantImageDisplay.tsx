import React, { useState, useEffect } from 'react';
import { TPlant } from './api/getPlants';
import { getImage } from './api/getImage';
import { TPlantImage } from './api/getImages';


function PlantImageDisplay({ plant }: { plant: TPlant }) {
  const [currentImage, setCurrentImage] = useState<string>('');

  useEffect(() => {
    // Fetch the URL for the last image ID
    const fetchImage = async () => {
      const lastImageId = plant.images[plant.images.length - 2];
      console.log(lastImageId);
      console.log(lastImageId);

      const image: TPlantImage = await getImage(lastImageId);
      console.log(image.url);
      setCurrentImage(image.url);
    };

    fetchImage();
  }, [plant]);

  return (
    <div>
      {currentImage && (
        <>
          <img
            src={currentImage}
            alt={`Image for ${plant.type}`}
            width={70}
            height={70}
          />
          <p style={{ margin: '0', fontSize: '14px' }}>{`#${plant.order}`}</p>
        </>
      )}
    </div>
  );
}

export default PlantImageDisplay;
