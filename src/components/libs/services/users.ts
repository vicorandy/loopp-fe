import axios from 'axios'
import { SignUpData,LoginData } from '../types';

const API_BASE_URL = 'http://localhost:5000/api/v1';


// Sign Up Function
export async function signUp(data: SignUpData){
  try {
    const response = await axios.post(`${API_BASE_URL}/users/sign-up`, data);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Sign up failed.');
    }
    throw new Error('An unexpected error occurred during sign up.');
  }
}

// Login Function
export async function login(data: LoginData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, data);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Login failed.');
    }
    throw new Error('An unexpected error occurred during login.');
  }
}
