import API from './axios';

export const fetchUsers = async () => {
    try {
        const response = await API.get('/users');
        console.log(response)
        return response.data; 
    } catch (error) {
        // Log the error or handle it as needed
        console.error('Failed to fetch users:', error.response ? error.response.data : 'Unknown error');
        // Optionally, rethrow the error if you want to handle it further up in the component
        throw error;
    }
};

export const fetchEntities = async () => {
    try {
        const response = await API.get('/v1/entity/all');
        console.log(response.data)
        return response.data; 
    } catch (error) {
        // Log the error or handle it as needed
        console.error('Failed to fetch entities:', error.response ? error.response.data : 'Unknown error');
        // Optionally, rethrow the error if you want to handle it further up in the component
        throw error;
    }
};

