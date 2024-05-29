import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

import "./Plant.css"
import PlantImageDisplay from "../../PlantImageDisplay";
import { TPlant, getPlants } from "../../api/getPlants";
import { TUser, getUser } from "../../api/getUser";

const Plant = () => {
  const [userId, setUserId] = useState(() => localStorage.getItem('userId') || '');
  const [plants, setPlants] = useState<TPlant[]>(() => {
    const storedPlants = localStorage.getItem('plants');
    return storedPlants ? JSON.parse(storedPlants) : [];
  });
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    setUserId("66468419b1c6da6f5f91dafd");
    if (userId) {
      handleGetUser(userId);
    }
  }, [userId]);


  async function handleGetUser(userID: string) {
    try {
      const user: TUser = await getUser(userID);
      console.log(user);
      setUserId(userID);
      const userPlants = await getPlants(userID);
      setPlants(userPlants);
      localStorage.setItem('userId', userID);
      localStorage.setItem('plants', JSON.stringify(userPlants));

      // Establish WebSocket connection
      //const ws = new WebSocket('ws://localhost:5004');
      const ws = new WebSocket('ws://54.208.55.232:5004');


      setSocket(ws);

      ws.onmessage = async (event) => {
        const message = JSON.parse(event.data);
        switch (message.type) {
          case 'new_image':
            setPlants((prevPlants) => {
              const updatedPlants = prevPlants.map((plant) => {
                if (plant._id === message.plantId) {
                  return {
                    ...plant,
                    images: [...plant.images, message.url],
                    developmentPhase: 99,
                    healthStatus: 99,
                  };
                }
                return plant;
              });
              localStorage.setItem('plants', JSON.stringify(updatedPlants));
              return updatedPlants;
            });
            break;
          case 'development_phase_update':
            break;
          case 'health_status_update':
            const userPlants2 = await getPlants(userID);
            setPlants(userPlants2);
            localStorage.setItem('userId', userID);
            localStorage.setItem('plants', JSON.stringify(userPlants2));
            break;
          default:
            console.error('Unknown message type:', message.type);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };

    } catch (error) {
      console.error('Failed to fetch user:', error);
      setPlants([]);
    }
  }
  const getDevelopmentPhaseWithHarvestEst = (stage: number) => {
    switch (stage) {
      case 1:
        return { stage: 'Cotyledon', daysToHarvest: 52 };
      case 2:
        return { stage: 'Rosetta', daysToHarvest: 45 };
      case 3:
        return { stage: 'Heading', daysToHarvest: 20 };
      case 4:
        return { stage: 'Harvest', daysToHarvest: '-' };
      default:
        return { stage: 'Unknown', daysToHarvest: '-' };
    }
  };
  const getHealthStatus = (status: number) => {
    return status === 0 ? 'Unhealthy' : 'Healthy';
  };


  const getDevStatus = (stage: number): string => {
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


  return (
    <div className="plants-ui ">

  <div className="section middle-section">
          <ul className="plants">
          {plants.map((plant) => {
            const healthClass = getHealthStatus(plant.healthStatus).toLowerCase();
            const backgroundColor = plant.developmentPhase === 99 ? 'yellow' : healthClass;

            return (
              <li key={plant._id} className={`plant ${backgroundColor}`}>

                <Link to={`plants/${plant._id}`}>


                  <div className="plant-content">
                  <div className="order-info">{`#${plant.order}`}</div>

                  <div className="image-container">
                    <PlantImageDisplay plant={plant} socket={socket} />
                    </div>
                    <text style={{textDecoration:"none", margin: '0', fontSize: '20px' }}>{plant.developmentPhase === 99 ? '...' : `Phase: ${getDevStatus(plant.developmentPhase)}`}</text>
                    <text style={{textDecoration:"none", margin: '0', fontSize: '20px' }}>{plant.healthStatus === 99 ? '...' : ` ${getHealthStatus(plant.healthStatus)}`}</text>
                  </div>

                </Link>

              </li>
            );
          })}
          </ul>
        </div>
    </div>
)
}

export default Plant;
