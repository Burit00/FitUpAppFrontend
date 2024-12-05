import { redirect } from 'next/navigation';
import { toDateOnly } from '@/utils/date';

export default function WorkoutPage() {
  return redirect(`/workout/${toDateOnly(new Date())}`);
}
