import { useState } from 'react'
import { Link } from 'react-router-dom';


import './App.css'
import { getUser,TUser } from './api/getUser';
import { createUser } from './api/createUser';
import { getPlants, TPlant } from './api/getPlants';



function App() {

  const [userId, setUserId] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [plants, setPlants] = useState<TPlant[]>([]);
  const [sensorValues, setSensorValues] = useState([]);



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


    </div>
  );
}

export default App
