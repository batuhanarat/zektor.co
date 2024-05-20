import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { getUser, TUser } from './api/getUser';
import { createUser } from './api/createUser';
import { getPlants, TPlant } from './api/getPlants';
import { getSensor, TSensor } from './api/getSensor';
import PlantImageDisplay from './PlantImageDisplay';

import temperatureIcon from './assets/images/temp.png';
import humidityIcon from './assets/images/hum.png';
import PlantDetails from './PlantDetails';

function App() {
  const [userId, setUserId] = useState(() => localStorage.getItem('userId') || '');
  const [loginMessage, setLoginMessage] = useState('');
  const [plants, setPlants] = useState<TPlant[]>(() => {
    const storedPlants = localStorage.getItem('plants');
    return storedPlants ? JSON.parse(storedPlants) : [];
  });
  const [sensors, setSensors] = useState<TSensor[]>([]);
  const [temperature, setTemperature] = useState<number | undefined>(undefined);
  const [humidity, setHumidity] = useState<number | undefined>(undefined);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (userId) {
      handleGetUser(userId);
    }
  }, [userId]);

  async function handleGetUser(userID: string) {
    try {
      const user: TUser = await getUser(userID);
      console.log(user);
      console.log(sensors);
      setUserId(userID);
      setLoginMessage(`User ID : ${userID} - logged in`);
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
      setLoginMessage('User cannot log in');
      setPlants([]);
    }
  }

  function handleLogout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('plants');
    setUserId('');
    setPlants([]);
    setLoginMessage('Logged out');
    if (socket) {
      socket.close();
    }
  }

  async function handleCreateUser() {
    try {
      const userID = await createUser();
      setLoginMessage(`User ID : ${userID} - is created and logged in`);
    } catch (error) {
      console.error('Failed to create user:', error);
      setLoginMessage('User cannot be created');
      setPlants([]);
    }
  }

  async function handleGetSensorData(userID: string) {
    try {
      const allSensors: TSensor[] = await getSensor(userID);
      setSensors(allSensors);
      const lastSensor: TSensor = allSensors[allSensors.length - 1];
      setTemperature(lastSensor.temperature);
      setHumidity(lastSensor.humidity);
    } catch (error) {
      console.error('Failed to fetch sensor data:', error);
      setTemperature(0);
      setHumidity(0);
    }
  }

  useEffect(() => {
    if (userId) {
      handleGetSensorData(userId);
    }
  }, [userId]);

  const getHealthStatus = (status: number) => {
    return status === 0 ? 'Unhealthy' : 'Healthy';
  };

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
    <div className="App">
      <div className="section top-section">
        <div className="user">
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserId(e.target.value);
            }}
          />
          <button onClick={() => handleGetUser(userId)}>Get User</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <button onClick={handleCreateUser}>Create User</button>
        <div className="loginMessage">{loginMessage}</div>
      </div>
      <div className="section middle-section">
        <div className="sensor-and-table">
          <div className="sensor-values">
            <div className="sensor-value">
              <img src={temperatureIcon} alt="Temperature" width={50} height={50} style={{ marginRight: '10px' }} />
              <span><p style={{ margin: '0', fontSize: '30px' }}>{`${temperature} °C`}</p></span>
            </div>
            <div className="sensor-value">
              <img src={humidityIcon} alt="Humidity" width={50} height={50} style={{ marginRight: '10px' }} />
              <span><p style={{ margin: '0', fontSize: '30px' }}>{`${humidity} g/m^3`}</p></span>
            </div>
          </div>
          <PlantDetails  />
                  </div>
      </div>


      <div className="section middle-section">
        <ul className="plants">
          {plants.map((plant) => {
            const healthClass = getHealthStatus(plant.healthStatus).toLowerCase();
            const backgroundColor = plant.developmentPhase === 99 ? 'yellow' : healthClass;
            return (
              <li key={plant._id} className={`plant ${backgroundColor}`}>
                              <div className="order-info">{`#${plant.order}`}</div>

                <Link to={`plants/${plant._id}`}>
                  <div>
                    <PlantImageDisplay plant={plant} socket={socket} />
                    <p style={{ margin: '0', fontSize: '20px' }}>{plant.developmentPhase === 99 ? '...' : `Phase: ${(plant.developmentPhase)}`}</p>
                    <p style={{ margin: '0', fontSize: '20px' }}>{plant.healthStatus === 99 ? '...' : ` ${getHealthStatus(plant.healthStatus)}`}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>


    </div>
  );
}

export default App;
