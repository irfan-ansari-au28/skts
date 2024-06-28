import API from './axios';

export const fetchAllEntities = async () => {
    try {
        const response = await API.get(`/api/v1/entity/all`);
        console.log(response.data)
        return response.data; 
    } catch (error) {
        // Log the error or handle it as needed
        console.error('Failed to fetch entities:', error.response ? error.response.data : 'Unknown error');
        // Optionally, rethrow the error if you want to handle it further up in the component
        throw error;
    }
};

// Function to fetch entity fields based on entityId
export const fetchEntityFields = async (entityId) => {
    try {
        const response = await API.get(`/v1/entity/fields/all/${entityId}`);
        if (response.data.isSuccess === "success") {
            return response.data.resultData; // Return the array of fields directly
        } else {
            throw new Error(response.data.errorDetails.errorMessage || "Unknown error fetching entity fields");
        }
    } catch (error) {
        console.error('Failed to fetch entity fields:', error);
        throw error;  // Rethrow to handle it in the component
    }
};


export const processBulkDownload = async (entityName, documentIds) => {
    try {
        // http://localhost:8080/api/fileDownloadAndProcess/processBuldDownlload?entityName=20
        const response = await API.post(`/api/fileDownloadAndProcess/processBuldDownlload?entityName=${entityName}`, {
            documentIds: documentIds
        });
        console.log('Bulk download process initiated:', response.data);
        return response
    } catch (error) {
        console.error('Failed to initiate bulk download:', error.response ? error.response.data : 'Unknown error');
        throw error;
    }
};

// Function to get a presigned URL for downloading a document
export const getPresignedUrl = async (entityName, documentId) => {
    try {
        // http://localhost:8080/api/fileDownloadAndProcess/presignedUrl?downloadLink=TESTING_2024-06-23T11:40:50.772286100Z_ZIP.zip
        const response = await API.post(`/api/fileDownloadAndProcess/presignedUrl?downloadLink=${"TESTING_2024-06-23T11:40:50.772286100Z_ZIP.zip"}`);
        console.log('Presigned URL received:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch presigned URL:', error.response ? error.response.data : 'Unknown error');
        throw error;
    }
};

export const fetchDownloadStatus = async () => {
    try {
        const response = await API.get('/api/fileDownloadAndProcess/bulkDownloadProcessStatus');
        console.log('Download status fetched:', response.data);
        if (response.data.isSuccess) {
            return response.data.data; // Return the array of download status
        } else {
            throw new Error(response.data.errorDetails.errorMessage || "Failed to fetch download status");
        }
    } catch (error) {
        console.error('Failed to fetch download status:', error.response ? error.response.data : 'Unknown error');
        throw error; // Rethrow the error to handle it in the component
    }
};

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

