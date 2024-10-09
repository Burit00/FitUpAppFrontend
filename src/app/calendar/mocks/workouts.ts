import { TDateTimeISO } from '@/types/TISODate';

export enum ExerciseType {
  WEIGHT_REPS,
  DISTANCE_TIME,
}

export interface DistanceTime {
  time: number;
  distance: number;
}

export interface WeightReps {
  reps: number;
  weight: number;
}

export type Exercise = {
  name: string;
} & (
  | {
      exerciseType: ExerciseType.WEIGHT_REPS;
      sets: WeightReps[];
    }
  | {
      exerciseType: ExerciseType.DISTANCE_TIME;
      sets: DistanceTime[];
    }
);

export type Workout = {
  date: TDateTimeISO;
  exercises: Exercise[];
};

type ExerciseTypes = DistanceTime & WeightReps;

export const MEASURES_MAP = new Map<keyof ExerciseTypes, string>([
  ['distance', 'm'],
  ['time', 's'],
  ['weight', 'kg'],
  ['reps', 'reps'],
]);

const WORKOUTS_MOCK: Workout[] = [];

function getRandomRunningExercise(): Exercise {
  const sets: DistanceTime[] = [];

  for (let i = 0; i < Math.random() * 3 + 1; i++) {
    const randomDistance = parseInt((Math.random() * 1500 + 500).toString());
    const randomTime = parseInt((Math.random() * 60 + 8).toString());

    sets.push({
      distance: randomDistance - (randomDistance % 10),
      time: randomTime,
    });
  }

  const exercise: Exercise = {
    name: 'Running',
    exerciseType: ExerciseType.DISTANCE_TIME,
    sets,
  };

  return exercise;
}

function getRandomBenchPressExercise(): Exercise {
  const sets: WeightReps[] = [];

  for (let i = 0; i < Math.random() * 3 + 1; i++) {
    const randomWeight = parseInt((Math.random() * 100 + 50).toString());
    const randomReps = parseInt((Math.random() * 12 + 8).toString());

    sets.push({
      weight: randomWeight - (randomWeight % 10),
      reps: randomReps,
    });
  }

  const exercise: Exercise = {
    name: 'Bench Press',
    exerciseType: ExerciseType.WEIGHT_REPS,
    sets,
  };

  return exercise;
}

for (let year = 2022; year <= 2025; year++) {
  for (let month = 0; month < 12; month++) {
    for (let dayNumber = 1; dayNumber <= 4; dayNumber++) {
      const date = new Date(
        year,
        month,
        parseInt((Math.random() * new Date(year, month + 1, 0).getDate()).toString()),
      ).toISOString() as TDateTimeISO;
      const exercises: Exercise[] = [];

      for (let i = 0; i < Math.random() * 10 + 10; i++) {
        if (Math.random() > 0.5) {
          exercises.push(getRandomRunningExercise());
        } else {
          exercises.push(getRandomBenchPressExercise());
        }
      }

      const workoutDay: Workout = {
        date,
        exercises,
      };

      WORKOUTS_MOCK.push(workoutDay);
    }
  }
}

export default WORKOUTS_MOCK;
