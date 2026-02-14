import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Invitation } from '../backend';

export function useGetInvitation(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Invitation>({
    queryKey: ['invitation', id],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getInvitation(id);
    },
    enabled: !!actor && !isFetching && !!id,
    retry: false,
  });
}

export function useCreateInvitation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      id: string;
      title: string;
      description: string;
      location: string;
      date: string;
      time: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.createInvitation(
        params.id,
        params.title,
        params.description,
        params.location,
        params.date,
        params.time
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
    },
  });
}
