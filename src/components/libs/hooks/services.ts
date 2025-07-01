import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query';
import { getServices,addService,editService,deleteService,searchServices } from '../services/services';
import { GetServicesParams,AddServicePayload,EditServicePayload } from '../types';

export const useAddService = () => {
  return useMutation({
    mutationFn: (data: AddServicePayload) => addService(data),
  });
};


export const useEditService = () => {
  return useMutation({
    mutationFn: ({ data, id }: { data: AddServicePayload; id: string }) => editService({ data, id }),
  });
};

export const useDeleteService = () => {
  return useMutation({
    mutationFn: (id: string ) => deleteService( id ),
  });
};

export const useSearchService = (searchTerm:string ) => {
  return useQuery({
    queryKey: ['search-service',searchTerm],
    queryFn: () => searchServices(searchTerm)
  })
}

export const useGetServices = ({ page, limit }: GetServicesParams) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['services', page, limit],
    queryFn: () => getServices({ page, limit }),
  });

  const refetchWithParams = (newParams: GetServicesParams) => {
    return queryClient.fetchQuery({
      queryKey: ['services', newParams.page, newParams.limit],
      queryFn: () => getServices({ page: newParams.page, limit: newParams.limit }),
    });
  };

  return { ...query, refetchWithParams };
};