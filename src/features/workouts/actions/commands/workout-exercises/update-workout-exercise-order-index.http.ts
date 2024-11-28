import { FitUpHttpClient } from '@api';

export function updateWorkoutExerciseOrderIndex(
  workoutExerciseMovedId: string,
  workoutExerciseOverId: string,
): Promise<Response> {
  return FitUpHttpClient.put(`workout-exercises/${workoutExerciseMovedId}/change-order`, {
    workoutExerciseOverId,
  });
}
