import { createQuery } from "@/hooks/queries";
import { getRoom } from '../services';

export const useGetRoom = createQuery({
  queryKey: ['getRoom'],
  queryFn: getRoom,
})