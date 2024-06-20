// import React, { useState, useEffect } from 'react';
// import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
// import { fetchEntities } from '../../api/apiService';
// import { useAppContext } from '../../context/AppContext';

// const EntitySelect = () => {
//   const { entityId, setEntityId } = useAppContext();
//   const [entities, setEntities] = useState([]);
//   // const [selectedEntity, setSelectedEntity] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const data = await fetchEntities();
//         console.log(data, 'all entities');
//         if (data.isSuccess === "success") {
//           setEntities(data.data);
//         }
//       } catch (error) {
//         console.error('Failed to fetch entities:', error);
//       }
//       setLoading(false);
//     };
  
//     fetchData();
//   }, []);

//   const handleChange = (event) => {
//     // set entity id
//     setEntityId(event.target.value);
//   };

//   if (loading) {
//     return <CircularProgress />;
//   }

//   return (
//     <FormControl sx={{  width: '100%' , minWidth: 120, maxWidth: 240 }} size="small">
//       <InputLabel id="entity-select">Document Type</InputLabel>
//       <Select
//         value={entityId || ''}
//         label="Document Type"
//         onChange={handleChange}
//         disabled={entities.length === 0}
//         sx={{ color: 'newColor.selectValue' }}
//         inputProps={{ 'aria-label': 'Without label' }}
//         id="entity-select"
//       >
//         {entities.map(entity => (
//           <MenuItem key={entity.entityId} value={entity.entityId} >
//             {entity.displayName}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// };

// export default EntitySelect;


import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { fetchEntities, setSelectedEntityId } from '../../features/entities/entitiesSlice';

const EntitySelect = () => {
    const dispatch = useDispatch();
    const { entities, selectedEntityId, loading } = useSelector(state => state.entities);

    // useEffect(() => {
    //     if (entities.length === 0) {
    //         dispatch(fetchEntities());
    //     }
    // }, [dispatch, entities.length]);

    const handleChange = (event) => {
        dispatch(setSelectedEntityId(event.target.value));
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <FormControl sx={{ width: '100%', minWidth: 120, maxWidth: 240 }} size="small">
            <InputLabel id="entity-select-label">Document Type</InputLabel>
            <Select
                labelId="entity-select-label"
                value={selectedEntityId || ''}
                label="Document Type"
                onChange={handleChange}
                disabled={entities.length === 0}
            >
                {entities.data.map(entity => (
                    <MenuItem key={entity.entityId} value={entity.entityId}>
                        {entity.displayName}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default EntitySelect;

