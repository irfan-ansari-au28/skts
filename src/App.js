import './App.css';
import { useEffect } from 'react';
import { fetchUsers } from './api/apiService';
import Login from './components/Login/Login';


function App() {
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Login />
    </div>
  );
}

export default App;
