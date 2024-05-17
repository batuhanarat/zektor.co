import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { getUser, TUser } from './api/getUser';
import { createUser } from './api/createUser';
import { getPlants, TPlant } from './api/getPlants';
import { getSensor, TSensor } from './api/getSensor';
import PlantImageDisplay from './PlantImageDisplay'; // Import the PlantImageDisplay component

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
                    developmentPhase: 99, // Set developmentPhase to 99 to indicate an update
                    healthStatus: 99, // Set healthStatus to 99 to indicate an update
                  };
                }
                return plant;
              });
              localStorage.setItem('plants', JSON.stringify(updatedPlants));
              return updatedPlants;
            });
            break;
          case 'development_phase_update':
            /*setPlants((prevPlants) => {
              const updatedPlants = prevPlants.map((plant) => {
                if (plant._id === message.plantId) {
                  return {
                    ...plant,
                    developmentPhase: message.developmentPhase,
                  };
                }
                return plant;
              });
              localStorage.setItem('plants', JSON.stringify(updatedPlants));
              return updatedPlants;
            });
            */
            //const userPlants = await getPlants(userID);
            //setPlants(userPlants);
            //localStorage.setItem('userId', userID);
            //localStorage.setItem('plants', JSON.stringify(userPlants));

            break;
          case 'health_status_update':
            /*setPlants((prevPlants) => {
              const updatedPlants = prevPlants.map((plant) => {
                if (plant._id === message.plantId) {
                  return {
                    ...plant,
                    healthStatus: message.healthStatus,
                  };
                }
                return plant;
              });
              localStorage.setItem('plants', JSON.stringify(updatedPlants));
              return updatedPlants;
            });
            */
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
        <ul className="plants">
          {plants.map((plant) => (
            <li key={plant._id} style={{ backgroundColor: plant.developmentPhase === 99 ? '#FFFF99' : 'white' }}>
              <Link to={`plants/${plant._id}`}>
                <div>
                  <PlantImageDisplay plant={plant} socket={socket} />
                  <p style={{ margin: '0', fontSize: '10px' }}>{`#${plant.order}`}</p>
                  <p style={{ margin: '0', fontSize: '10px' }}>{plant.developmentPhase === 99 ? '...' : `Phase: ${plant.developmentPhase}`}</p>
                  <p style={{ margin: '0', fontSize: '10px' }}>{plant.healthStatus === 99 ? '...' : `Health: ${plant.healthStatus}`}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="section bottom-section">
        <h1 style={{ display: 'block' }}> Sensor Values</h1>
        <h2 style={{ display: 'block' }}> Temperature: {temperature}</h2>
        <h2 style={{ display: 'block' }}> Humidity: {humidity}</h2>
      </div>
    </div>
  );
}

export default App;
