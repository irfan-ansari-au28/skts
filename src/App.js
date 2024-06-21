import './App.css';
import { useEffect } from 'react';
// import { fetchEntities, fetchEntityFields, fetchUsers } from './api/apiService';
import Login from './components/Login/Login';
import HomePage from './pages/HomePage';
import RouterConfig from './RouterConfig';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEntities } from './features/entities/entitiesSlice';
import DualSelectComponent from './components/test/Test';
import Search from './components/pages/Search';


function App() {

  const dispatch = useDispatch();
  const { entities, loading, error } = useSelector(state => state.entities);

  

  useEffect(() => {
    dispatch(fetchEntities());
    if(entities){
      console.log(entities,"------------------")
    }
  }, [dispatch]);

  useEffect(() => {
    // fetchUsers();
    // fetchEntityFields('10001')
  }, []);

  return (
    <div>
        
     
   
      {/* <Login /> */}
      {/* <HomePage/> */}
      <RouterConfig/>
      <DualSelectComponent/>
      <Search/>
      {loading ? (
        <p>Loading...</p>
      ) : (
        entities?.data?.map(entity => <div key={entity.entityId}>{entity.displayName}</div>)
      )}
    
    </div>
  );
}

export default App;
