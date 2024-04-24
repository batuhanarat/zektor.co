import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';


import './App.css'
import { getUser,TUser } from './api/getUser';
import { createUser } from './api/createUser';
import { getPlants, TPlant } from './api/getPlants';
import { getSensor, TSensor } from './api/getSensor';



function App() {

  const [userId, setUserId] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [plants, setPlants] = useState<TPlant[]>([]);
  const [temperature, setTemperature] = useState<number | undefined>(undefined);
  const [humidity, setHumidity] = useState<number | undefined>(undefined);


  async function handleGetUser(userID:string) {
    try {
      const user: TUser = await getUser(userID);
      setUserId(userID);
      setLoginMessage(`User ID : ${userID} - logged in`);
      const userPlants = await getPlants(userID);
      setPlants(userPlants);

    } catch (error) {
      console.error("Failed to fetch user:", error);
      setLoginMessage('User cannot log in');
      setPlants([]);
    }
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
      const sensor:TSensor = await getSensor(userID);
      console.error("sensor temp:", sensor.temperature);
      setTemperature(sensor.temperature);
      setHumidity(sensor.humidity);
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
          <Link to={`plants/${plant._id}`}>{plant.type}</Link>
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


