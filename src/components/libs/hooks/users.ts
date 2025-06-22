import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query';
import { signUp, login, getUser } from '../services/users';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { log } from 'console';

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log('Sign up successful:', data);

      if (data.token) {
        Cookies.set('authToken', data.token, { expires: 30 }); // Expires in  30days
      }
      if(data.user.userRole === 'project-manager') router.push('/dashboard/project-manager')
      if(data.user.userRole === 'project-owner') router.push('/dashboard/project-owner')
      if(data.user.userRole === 'project-engineer') router.push('/dashboard/project-engineer')
    },
    onError: (error) => {
      console.error('Sign up failed:', error);
    }
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess : (data) => {
        if (data.token) {
            Cookies.set('authToken', data.token, { expires: 30 }); // Expires in  30days
          }
          if(data.user.userRole === 'project-manager') router.push('/dashboard/project-manager')
          if(data.user.userRole === 'project-owner') router.push('/dashboard/project-owner')
          if(data.user.userRole === 'project-engineer') router.push('/dashboard/project-engineer')
    }
  });
};


export const useGetUser = () => {
    return useQuery({
        queryFn:getUser,
        queryKey:['get user info'],
    })
  };