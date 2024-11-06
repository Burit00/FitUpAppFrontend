import { TWorkoutExercise } from '@/api/types/workouts/workout-exercise.type';

export type TWorkout = {
  id: string;
  date: Date;
  exercises: TWorkoutExercise[];
};
