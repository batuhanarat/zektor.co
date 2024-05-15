import { TPlant } from "./api/getPlants";

function PlantImageDisplay({ plant, latestImage }: { plant: TPlant; latestImage: string }) {
    return (
      <div>
        {latestImage && (
          <img
            src={latestImage}
            alt={`Image for ${plant.type}`}
            width={70}
            height={70}
          />
        )}
      </div>
    );
  }
  export default PlantImageDisplay;
