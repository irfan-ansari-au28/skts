import './App.css';
import { useEffect } from 'react';
import { fetchUsers } from './api/apiService';
import Login from './components/Login/Login';
import HomePage from './pages/HomePage';


function App() {
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {/* <Login /> */}
      <HomePage/>
    </div>
  );
}

export default App;
