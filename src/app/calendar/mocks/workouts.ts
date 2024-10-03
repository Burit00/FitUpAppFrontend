export enum ExerciseType {
  WEIGHT_REPS,
  DISTANCE_TIME,
}

type DistanceTime = {
  time: number;
  distance: number;
};

type WeightReps = {
  reps: number;
  weight: number;
};

type Exercise = {
  exerciseName: string;
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
  date: Date;
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
    sets.push({
      distance: parseInt((Math.random() * 1500 + 500).toString()) % 10,
      time: parseInt((Math.random() * 60).toString()) + 8,
    });
  }

  const exercise: Exercise = {
    exerciseName: 'Running',
    exerciseType: ExerciseType.DISTANCE_TIME,
    sets,
  };

  return exercise;
}

function getRandomBenchPressExercise(): Exercise {
  const sets: WeightReps[] = [];

  for (let i = 0; i < Math.random() * 3 + 1; i++) {
    sets.push({
      weight: parseInt((Math.random() * 100 + 50).toString()) % 10,
      reps: parseInt((Math.random() * 12).toString()) + 8,
    });
  }

  const exercise: Exercise = {
    exerciseName: 'Bench Press',
    exerciseType: ExerciseType.WEIGHT_REPS,
    sets,
  };

  return exercise;
}

for (let year = 2022; year <= 2025; year++) {
  for (let month = 0; month < 12; month++) {
    for (let dayNumber = 1; dayNumber <= 4; dayNumber++) {
      const date = new Date(year, month, parseInt((Math.random() * new Date(year, month + 1, 0).getDate()).toString()));
      const exercises: Exercise[] = [];

      for (let i = 0; i < Math.random() * 2 + 1; i++) {
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
