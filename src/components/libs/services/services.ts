
import axios,{AxiosError} from 'axios'
import { GetServicesParams,AddServicePayload } from '../types';
import { getUsersToken } from '../utils';



const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ;


export const addService = async (data: AddServicePayload): Promise<any> => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('category', data.category);
  formData.append('description', data.description);
  formData.append('verified', String(data.verified));
  formData.append('pro', String(data.pro));
  formData.append('file', data.file);

  const response = await axios.post(`${API_BASE_URL}/services/add-service`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const getServices = async ({ page, limit }: GetServicesParams) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/services/get-services`,{
        params : {page,limit}
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Login failed.');
    }
    throw new Error('An unexpected error occurred during login.');
  }
}