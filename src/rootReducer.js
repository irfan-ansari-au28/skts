import { combineReducers } from '@reduxjs/toolkit';
import entitiesReducer from './features/entities/entitiesSlice';
// import documentsReducer from '../features/documents/documentsSlice';

const rootReducer = combineReducers({
  entities: entitiesReducer,
  // Include other reducers here
  //   documents: documentsReducer,
});

export default rootReducer;
