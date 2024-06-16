import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { fetchEntities } from '../../api/apiService';

const EntitySelect = ({ onEntitySelect }) => {
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchEntities();
        console.log(data, 'all entities');
        if (data.isSuccess === "success") {
          setEntities(data.resultData);
        }
      } catch (error) {
        console.error('Failed to fetch entities:', error);
      }
      setLoading(false);
    };
  
    fetchData();
  }, []);

  const handleChange = (event) => {
    const entityId = event.target.value;
    setSelectedEntity(entityId);
    onEntitySelect(entityId);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <FormControl sx={{  width: '100%' , minWidth: 120, maxWidth: 240 }} size="small">
      <InputLabel>Entity</InputLabel>
      <Select
        value={selectedEntity}
        label="Entity"
        onChange={handleChange}
        disabled={entities.length === 0}
      >
        {entities.map(entity => (
          <MenuItem key={entity.entityId} value={entity.entityId}>
            {entity.displayName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default EntitySelect;
