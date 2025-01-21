import { redirect } from 'next/navigation';
import { toDateOnly } from '@/utils/date';

export default function WorkoutPage() {
  redirect(`/workout/${toDateOnly(new Date())}`);

  return null;
}
