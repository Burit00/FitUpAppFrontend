import { TExerciseCategory } from '@/api/types/workouts/exercise-category.type';

export type TExercise = {
  id: string;
  name: string;
  category: TExerciseCategory;
};
