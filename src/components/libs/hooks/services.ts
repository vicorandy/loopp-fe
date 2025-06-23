import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query';
import { getServices,addService } from '../services/services';
import { GetServicesParams,AddServicePayload } from '../types';

export const useAddService = () => {
  return useMutation({
    mutationFn: (data: AddServicePayload) => addService(data),
  });
};

export const useGetServices = ({ page, limit }: GetServicesParams) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['services', page, limit],
    queryFn: () => getServices({ page, limit }),
     
  });

  const refetchWithParams = (newParams: GetServicesParams) => {
    queryClient.invalidateQueries({
      queryKey: ['services', newParams.page, newParams.limit],
    });
  };

  return { ...query, refetchWithParams };
};