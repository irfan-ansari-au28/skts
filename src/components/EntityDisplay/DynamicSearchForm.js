// import React, { useState, useEffect } from 'react';
// import { Grid, TextField, Button, Box } from '@mui/material';
// import { fetchEntityFields } from '../../api/apiService';
// import { useAppContext } from '../../context/AppContext';
// import { CircularProgress,  Typography } from '@mui/material';

// const DynamicSearchForm = () => {
//   const { entityId } = useAppContext();
//   const [fields, setFields] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadFields = async () => {
//       setLoading(true);
//       setError(null)
//       try {
//         const data = await fetchEntityFields(entityId);
//         setFields(data);
//         setLoading(false);
//       } catch (error) {
//           console.error('Failed to load fields:', error);
//           setError('Failed to load fields');
//         setLoading(false);
//       }
//     };

//     if (entityId) {
//       loadFields();
//     }
//   }, [entityId]);

//   const handleChange = (fieldId, value) => {
//     setFormData((prev) => ({ ...prev, [fieldId]: value }));
//   };

//   const handleSubmit = () => {
//     console.log('Submitting form data:', formData);
//     // Perform search or other actions
//   };

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <Box sx={{ flexGrow: 1, overflow: 'hidden',  }}>
//       <Grid container spacing={2} alignItems="center">
//         {fields.map((field, index) => (
//           <Grid item xs key={field.fieldId}>
//             <TextField
//               fullWidth
//               label={field.displayName}
//               variant="outlined"
//               value={formData[field.fieldId] || ''}
//               onChange={(e) => handleChange(field.fieldId, e.target.value)}
//               type={field.dataType === 'string' ? 'text' : 'number'}
//               required={field.isMandatory}
//             />
//           </Grid>
//         ))}
//         {fields && fields?.length > 0 && (
//           <Grid item>
//             <Button variant="contained" color="primary" onClick={handleSubmit}>
//               Search
//             </Button>
//           </Grid>
//         )}
//       </Grid>
//     </Box>
//   );
// };

// export default DynamicSearchForm;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, TextField, Button, Box, CircularProgress, Typography } from '@mui/material';

const DynamicSearchForm = () => {
  const dispatch = useDispatch();
  const { entities, selectedEntityId, loading, error } = useSelector(state => state.entities);
  const [formData, setFormData] = React.useState({});

  // Extract searchFields for the selected entityId
  const searchFields = entities.data.find(entity => entity.entityId === selectedEntityId)?.searchFields || [];

  const handleChange = (fieldId, value) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = () => {
    console.log('Submitting form data:', formData);
    // Here you can dispatch an action to handle form submission
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
      <Grid container spacing={2} alignItems="center">
        {searchFields.map((field) => (
          <Grid item xs key={field.fieldId}>
            <TextField
              fullWidth
              label={field.displayName}
              variant="outlined"
              value={formData[field.fieldId] || ''}
              onChange={(e) => handleChange(field.fieldId, e.target.value)}
              type={field.dataType === 'string' ? 'text' : 'number'}
              required={field.isMandatory}
            />
          </Grid>
        ))}
        {searchFields.length > 0 && (
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Search
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default DynamicSearchForm;

