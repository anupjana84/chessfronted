import axios from 'axios';
import { toastError } from './notifyCustom';

export const getApi = async (url) => {
    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        if (error.response) {
            toastError(error.response.data.message || 'An error occurred');
        } else if (error.request) {
            toastError('No response received from server');
        } else {
            toastError('Error setting up the request');
        }
        return error;
    }
};

export const getApiWithToken = async (url) => {
    const token = localStorage.getItem('chess-user-token');
    if (!token) {
        toastError('Authentication token not found');
        return { error: 'Authentication token not found' };
    }

    try {
        const response = await axios(url, {
            method: "GET",
            headers: {
                Authorization: JSON.parse(token),
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (error) {
        if (error.response) {
            toastError(error.response.data.message || 'An error occurred');
        } else if (error.request) {
            toastError('No response received from server');
        } else {
            toastError('Error setting up the request');
        }
        return error;
    }
};

export const postApi = async (url) => {
    const token = localStorage.getItem('chess-user-token');
    if (!token) {
        toastError('Authentication token not found');
        return { error: 'Authentication token not found' };
    }

    try {
        const response = await axios(url, {
            method: "POST",
            headers: {
                Authorization: JSON.parse(token),
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (error) {
        let message = 'An unexpected error occurred';
        
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    message = 'Unauthorized access. Please log in again.';
                    break;
                case 404:
                    message = 'Resource not found.';
                    break;
                default:
                    message = error.response.data.message || 'An error occurred';
            }
            toastError(message);
        } else if (error.request) {
            toastError('No response received from server');
        } else {
            toastError('Error setting up the request');
        }
        return error.response;
    }
};

export const postNoDataWithTokenApi = async (url) => {
    const token = localStorage.getItem('chess-user-token');
    if (!token) {
        toastError('Authentication token not found');
        return { error: 'Authentication token not found' };
    }

    try {
        const response = await axios(url, {
            method: "POST",
            headers: {
                Authorization: JSON.parse(token),
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (error) {
        if (error.response) {
            toastError(error.response.data.message || 'An error occurred');
        } else if (error.request) {
            toastError('No response received from server');
        } else {
            toastError('Error setting up the request');
        }
        return error;
    }
};

export const postApiWithToken = async (url, formData) => {
    const token = localStorage.getItem('chess-user-token');
    if (!token) {
        toastError('Authentication token not found');
        return { error: 'Authentication token not found' };
    }

    try {
        const response = await axios(url, {
            method: "POST",
            headers: {
                Authorization: JSON.parse(token),
                "Content-Type": "application/json",
            },
            data: JSON.stringify(formData)
        });
        return response;
    } catch (error) {
        if (error.response) {
            toastError(error.response.data.message || 'An error occurred');
        } else if (error.request) {
            toastError('No response received from server');
        } else {
            toastError('Error setting up the request');
        }
        return error;
    }
};

export const postApiWithFormdata = async (url, formData) => {
    try {
        const response = await axios(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(formData)
        });
        return response;
    } catch (error) {
        if (error.response) {
            toastError(error.response.data.message || 'An error occurred');
        } else if (error.request) {
            toastError('No response received from server');
        } else {
            toastError('Error setting up the request');
        }
        return error.response;
    }
};

export const postApiWithTokenRowData = async (url, formData) => {
    const token = localStorage.getItem('chess-user-token');
    if (!token) {
        toastError('Authentication token not found');
        return { error: 'Authentication token not found' };
    }

    try {
        const response = await axios(url, {
            method: "POST",
            headers: {
                Authorization: JSON.parse(token),
                "Content-Type": "application/json",
            },
            data: JSON.stringify(formData)
        });
        return response;
    } catch (error) {
        if (error.response) {
            toastError(error.response.data.message || 'An error occurred');
        } else if (error.request) {
            toastError('No response received from server');
        } else {
            toastError('Error setting up the request');
        }
        return error;
    }
};