import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import api from '../lib/api';
import { AxiosError } from 'axios';

export const useApi = <TData = unknown, TError = AxiosError>(
  key: string[],
  url: string,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<TData, TError>({
    queryKey: key,
    queryFn: async () => {
      const response = await api.get(url);
      return response.data;
    },
    ...options,
  });
};

export const useApiMutation = <TData = unknown, TVariables = unknown, TError = AxiosError>(
  url: string,
  method: 'post' | 'put' | 'patch' | 'delete' = 'post',
  options?: UseMutationOptions<TData, TError, TVariables>
) => {
  const queryClient = useQueryClient();

  return useMutation<TData, TError, TVariables>({
    mutationFn: async (data: TVariables) => {
      const response = await api[method](url, data);
      return response.data;
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries();
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};
