import { useState, useEffect, useReducer} from 'react'
import { Link } from 'react-router-dom';


import './App.css'
import { getUser,TUser } from './api/getUser';
import { createUser } from './api/createUser';
import { getPlants, TPlant } from './api/getPlants';
import { getSensor, TSensor } from './api/getSensor';
import PlantImageDisplay from './PlantImageDisplay';


import plant1Image from './assets/images/1.png';
import plant2Image from './assets/images/2.png';
import plant3Image from './assets/images/3.png';
import plant4Image from './assets/images/4.png';
import { TPlantImage } from './api/getImages';
import { getImage } from './api/getImage';


function App() {

  //const [userId, setUserId] = useState('');
  const [userId, setUserId] = useState(() => {
    // Initialize user ID from localStorage, or an empty string if it's not found
    return localStorage.getItem('userId') || '';
  });
  const [loginMessage, setLoginMessage] = useState('');
  //  const [plants, setPlants] = useState<TPlant[]>([]);
  const [plants, setPlants] = useState<TPlant[]>(() => {
    const storedPlants = localStorage.getItem('plants');
    return storedPlants ? JSON.parse(storedPlants) : [];
  });

  const [sensors,setSensors] = useState<TSensor[]>([]);
  const [temperature, setTemperature] = useState<number | undefined>(undefined);
  const [humidity, setHumidity] = useState<number | undefined>(undefined);
  const [latestImages, setLatestImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const socket = new WebSocket('ws://54.208.55.232:5005');

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.onmessage = (event) => {
      console.log('Received message from server');
      const imageData = JSON.parse(event.data);
      setLatestImages((prevImages) => ({
        ...prevImages,
        [imageData.plantId]: imageData.image,
      }));
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const user: TUser = await getUser(userId);
        setLoginMessage(`User ID : ${userId} - logged in`);
        const userPlants = await getPlants(userId);
        setPlants(userPlants);

        const latestImagesMap: { [key: string]: string } = {};
        for (const plant of userPlants) {
          const lastImageId = plant.images[plant.images.length - 1];
          const image: TPlantImage = await getImage(lastImageId);
          latestImagesMap[plant._id] = image.url;
        }
        setLatestImages(latestImagesMap);

        localStorage.setItem('plants', JSON.stringify(userPlants));
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setLoginMessage('User cannot log in');
        setPlants([]);
      }
    }

    fetchData();
  }, [userId]);


  async function handleGetUser(userID:string) {
    try {
      const user: TUser = await getUser(userID);
      setUserId(userID);
      setLoginMessage(`User ID : ${userID} - logged in`);
      const userPlants = await getPlants(userID);
      setPlants(userPlants);

      localStorage.setItem('userId', userID);
      localStorage.setItem('plants', JSON.stringify(userPlants));

    } catch (error) {
      console.error("Failed to fetch user:", error);
      setLoginMessage('User cannot log in');
      setPlants([]);
    }
}
  function handleLogout() {
    // Clear user ID and plants data from localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('plants');
    setUserId('');
    setPlants([]);
    setLoginMessage('Logged out');
  }

  async function handleCreateUser() {
    try {
      const userID = await createUser();
      setLoginMessage(`User ID : ${userID} - is created and logged in`);
    }
    catch (error) {
      console.error("Failed to create user:", error);
      setLoginMessage('User cannot be created');
      setPlants([]);
    }
  }

  async function handleGetSensorData(userID:string) {
    try {
      const allSensors:TSensor[] = await getSensor(userID);
      console.log(sensors);
      setSensors(allSensors);
      const lastSensor:TSensor = allSensors[allSensors.length - 1];
      setTemperature(lastSensor.temperature);
      setHumidity(lastSensor.humidity);
    }
    catch (error) {
      console.error("Failed to create sensor:", error);
      setTemperature(0);
      setHumidity(0);
    }
  }





  return (

    <div className='App'>
      <div className="section top-section">
        <div className = 'user'>
          <label>User ID:</label>
          <input type="text" value={userId}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
            setUserId(e.target.value);
          }} />
          <button onClick={() => handleGetUser(userId)}>Get User</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <button onClick={handleCreateUser}>Create User</button>
          <div className='loginMessage'>
        {loginMessage}
        </div>
      </div>

      <div className='section middle-section'>
      <ul className='plants'>
      { plants.map((plant) => (
        <li key={plant._id}>
     <Link to={`plants/${plant._id}`}>
                <div>
                  <PlantImageDisplay plant={plant} latestImage={latestImages[plant._id]} />
                  <p style={{ margin: '0', fontSize: '14px' }}>{`#${plant.order}`}</p>
                </div>
              </Link>
        </li>
      ))} </ul>
      </div>

      <div className='section bottom-section'>
        <h1 style={{ display: 'block' }}> Sensor Values</h1>
        <h2 style={{ display: 'block' }}> Temperature: {temperature}</h2>
        <h2 style={{ display: 'block' }}> Humidity: {humidity}</h2>
      </div>


    </div>
  );
}

export default App


