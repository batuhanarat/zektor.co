import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';


import './App.css'
import { getUser,TUser } from './api/getUser';
import { createUser } from './api/createUser';
import { getPlants, TPlant } from './api/getPlants';
import { getSensor, TSensor } from './api/getSensor';


import plant1Image from './assets/images/1.png';
import plant2Image from './assets/images/2.png';
import plant3Image from './assets/images/3.png';
import plant4Image from './assets/images/4.png';


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


  async function handleGetUser(userID:string) {
    try {
      const user: TUser = await getUser(userID);
      console.log(user)
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

  useEffect(() => {

     handleGetSensorData(userId);
  }, [userId]);




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
      {plants.map((plant) => (
        <li key={plant._id}>

<Link to={`plants/${plant._id}`}>
  <div style={{ textAlign: 'center' }}>
    <img
      src={
        plant.developmentPhase === 1
          ? plant1Image
          : plant.developmentPhase === 2
          ? plant2Image
          : plant.developmentPhase === 3
          ? plant3Image
          : plant.developmentPhase === 4
          ? plant4Image
          : ''
      }
      alt={`Image for ${plant.type}`}
      width={70}
      height={70}
    />
    <p style={{ margin: '0', fontSize: '14px' }}>{ "#" + plant.order}</p>
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


