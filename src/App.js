import './App.css';
import { useEffect } from 'react';
// import { fetchEntities, fetchEntityFields, fetchUsers } from './api/apiService';
import Login from './components/Login/Login';
import HomePage from './pages/HomePage';
import RouterConfig from './RouterConfig';
// import DualSelectComponent from './components/test/Test';
import Search from './components/pages/Search';
import DynamicTable from './components/DynamicTable/DynamicTable';


function App() {



  useEffect(() => {
    // fetchUsers();
    // fetchEntityFields('10001')
  }, []);

  return (
    <div>
        
     
   
      {/* <Login /> */}
      {/* <HomePage/> */}
      <RouterConfig/>
      {/* <DualSelectComponent/> */}
      {/* <Search/> */}


    
    </div>
  );
}

export default App;
