import { combineReducers } from '@reduxjs/toolkit';
import entitiesReducer from './features/entities/entitiesSlice';
import entityReducer from './features/entities/searchSlice';
// import documentsReducer from '../features/documents/documentsSlice';

const rootReducer = combineReducers({
  entities: entitiesReducer,
  entity: entityReducer,
  // Include other reducers here
  //   documents: documentsReducer,
});

export default rootReducer;
