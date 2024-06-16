import './App.css';
import { useEffect } from 'react';
import { fetchEntities, fetchUsers } from './api/apiService';
import Login from './components/Login/Login';
import HomePage from './pages/HomePage';
import RouterConfig from './RouterConfig';


function App() {
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {/* <Login /> */}
      {/* <HomePage/> */}
      <RouterConfig/>
    </div>
  );
}

export default App;
