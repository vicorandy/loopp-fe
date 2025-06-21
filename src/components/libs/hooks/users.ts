import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp, login } from '../services/users';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log('Sign up successful:', data);

      if (data.token) {
        Cookies.set('authToken', data.token, { expires: 7 }); // Expires in 7 days
      }

      router.push('/dashboard');
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
    mutationFn: login
  });
};
