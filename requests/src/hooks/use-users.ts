import { useQuery } from '@tanstack/react-query';
import type { User } from '../models/user';
import { fetcher } from '../helpers/api';

export default function useUsers() {
  const queryKey = '/users';
  const { data, isLoading } = useQuery<User[]>({
    queryKey: queryKey.split('/'),
    queryFn: () => fetcher(queryKey),
  });

  return {
    users: data || [],
    isLoadingUsers: isLoading,
  };
}
