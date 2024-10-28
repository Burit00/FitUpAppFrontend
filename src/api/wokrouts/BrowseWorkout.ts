import { TDateTimeISO } from '@/types/TISODate';
import { UUID } from 'node:crypto';

export type TBrowseWorkout = {
  id: UUID;
  date: TDateTimeISO;
};
