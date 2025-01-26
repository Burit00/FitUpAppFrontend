import { useDebounceState } from '@/hooks/useDebounceState';
import { useEffect, useState } from 'react';
import { TExercise } from '@features/workouts/types';
import { getExercises } from '@features/workouts/actions';

type TUseExerciseReturnType = {
  exercises: TExercise[];
  exerciseSearch: string;
  setExerciseSearch: (value: string) => void;
  isLoading: boolean;
};

export function useExercises({ selectedCategoryId }: { selectedCategoryId?: string }): TUseExerciseReturnType {
  const [exerciseSearch, setExerciseSearch] = useDebounceState('');
  const [exercises, setExercises] = useState<TExercise[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getExercisesFromApi = async (params: { search?: string; categoryId?: string }): Promise<void> => {
      setIsLoading(true);
      const response = await getExercises(params);
      setIsLoading(false);

      if (!response.ok) return;

      const data = await response.json();
      setExercises(data);
    };
    const categoryId = selectedCategoryId !== 'all' ? selectedCategoryId : '';
    getExercisesFromApi({ search: exerciseSearch, categoryId });
  }, [exerciseSearch, selectedCategoryId]);

  return {
    exercises,
    exerciseSearch,
    setExerciseSearch,
    isLoading,
  };
}
