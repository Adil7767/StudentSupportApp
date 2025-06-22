import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const API_BASE_URL = 'https://api-student-support-app.vercel.app/api';

const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleResponse = async (response: Response) => {
  let data;
  try {
    data = await response.json();
  } catch {
    data = {};
  }
  if (!response.ok) {
    console.warn('API WARNING:', data || response.statusText);
    throw data;
  }
  return data;
};

interface Credentials {
  email: string;
  password: string;
}

export const loginUser = async (credentials: Credentials) => {
  console.log(credentials,'credentials')
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers,
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  } catch (error) {
    Alert.alert(`Error ${error}`)
    console.error('loginUser error:',error);
    throw error;
  }
};

export const registerUser = async (userData: { name: string; email: string; password: string; studentId: string; }) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers,
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('registerUser error:', error);
    throw error;
  }
};

export const getEvents = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/community/events`, {
      method: 'GET',
      headers,
    });
    return handleResponse(response);
  } catch (error) {
    console.error('getEvents error:', error);
    throw error;
  }
};

export const createEvent = async (eventData: any) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/community/events`, {
      method: 'POST',
      headers,
      body: JSON.stringify(eventData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('createEvent error:', error);
    throw error;
  }
};

export const updateEvent = async (id: any, eventData: any) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/community/events/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(eventData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('updateEvent error:', error);
    throw error;
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/community/events/${id}`, {
      method: 'DELETE',
      headers,
    });
    return handleResponse(response);
  } catch (error) {
    console.error('deleteEvent error:', error);
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/community/posts`, {
      method: 'GET',
      headers,
    });
    return handleResponse(response);
  } catch (error) {
    console.error('getPosts error:', error);
    throw error;
  }
};

export const createPost = async (postData: any) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/community/posts`, {
      method: 'POST',
      headers,
      body: JSON.stringify(postData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('createPost error:', error);
    throw error;
  }
};

export const updatePost = async (id: any, postData: any) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/community/posts/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(postData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('updatePost error:', error);
    throw error;
  }
};

export const deletePost = async (id: string) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/community/posts/${id}`, {
      method: 'DELETE',
      headers,
    });
    return handleResponse(response);
  } catch (error) {
    console.error('deletePost error:', error);
    throw error;
  }
};

export const sendChatMessage = async (messageData: { message: string; userId: string | undefined; }) => {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/mental-health/chat`, {
      method: 'POST',
      headers,
      body: JSON.stringify(messageData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('sendChatMessage error:', error);
    throw error;
  }
}; 