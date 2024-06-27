import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axios';

// Async thunk for fetching entities
export const fetchEntities = createAsyncThunk(
  'entities/fetchEntities',
  async (type, { rejectWithValue }) => {
    try {
      const response = await API.get(`/api/v1/entity/all?type=${type}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const entitiesSlice = createSlice({
  name: 'entities',
  initialState: {
    entities: [],
    searchFields: {}, 
    selectedEntityId: '',
    downloadNotification: false,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedEntityId: (state, action) => {
        state.selectedEntityId = action.payload;
    },
    setSearchFields: (state, action) => {  
      state.searchFields = action.payload;
    },
    setDownloadNotification: (state, action) => {
      state.downloadNotification = action.payload
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
        // show bulk downlaod notification intiated
        state.entities.showDownloadNotification= true
      })
      .addCase(fetchEntities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setSelectedEntityId, setSearchFields, setDownloadNotification } = entitiesSlice.actions;


export default entitiesSlice.reducer;
