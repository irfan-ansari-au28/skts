import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import {  setSelectedEntityId } from '../../features/entities/entitiesSlice';

const EntitySelect = () => {
    const dispatch = useDispatch();
    const { entities, selectedEntityId, loading } = useSelector(state => state.entities);


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
                disabled={entities?.resultData?.length === 0}
            >
                {entities?.resultData?.map(entity => (
                    <MenuItem key={entity.entityId} value={entity.entityId}>
                        {entity.displayname}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default EntitySelect;

