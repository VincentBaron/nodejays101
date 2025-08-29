import { useQuery } from '@tanstack/react-query';
import { setsApi } from './queries';
import { Set } from '../types';

export const useSets = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['sets'],
    queryFn: setsApi.getSets,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    sets: data || [],
    loading: isLoading,
    error,
    refetch,
  };
};
