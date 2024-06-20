import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axios';

// Async thunk for fetching entities
export const fetchEntities = createAsyncThunk(
  'entities/fetchEntities',
  async () => {
    const response = await API.get('/v1/entity/all');
    return response.data;
  }
);

const entitiesSlice = createSlice({
  name: 'entities',
  initialState: {
    entities: [],
    selectedEntityId: '',
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedEntityId: (state, action) => {
        state.selectedEntityId = action.payload;
    }
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEntities.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.loading = false;
      })
      .addCase(fetchEntities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setSelectedEntityId } = entitiesSlice.actions;


export default entitiesSlice.reducer;
