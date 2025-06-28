
import axios,{AxiosError} from 'axios'
import { GetServicesParams,AddServicePayload,EditServicePayload } from '../types';
import { getUsersToken } from '../utils';



const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ;
const token = getUsersToken()

export const editService = async ({ data, id }: { data: AddServicePayload; id: string }) => {
  const formData =  data
  

  const response = await axios.post(`${API_BASE_URL}/services/edit-service/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization : `Bearer ${token}`
    },
  });

  return response.data;
};

export const deleteService = async (id:string) => {
  console.log(token)
  const response = await axios.delete(`${API_BASE_URL}/services/delete-service/${id}`, {
    headers: {
      Authorization : `Bearer ${token}`
    },
  });

  return response.data;
};

export const addService = async (data: AddServicePayload) => {
  const formData =  data
  console.log({data})
  

  const response = await axios.post(`${API_BASE_URL}/services/add-service`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization : `Bearer ${token}`
    },
  });

  return response.data;
};

export const getServices = async ({ page, limit }: GetServicesParams) => {
  try {
    console.log({page,limit})
    console.log('runing')
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

