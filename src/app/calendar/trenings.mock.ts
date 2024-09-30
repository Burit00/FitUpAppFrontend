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

export const WORKOUTS_MOCK: Workout[] = [
  {
    date: new Date(2024, 8, 23),
    exercises: [
      {
        exerciseName: 'Flat barbell bench press',
        exerciseType: ExerciseType.WEIGHT_REPS,
        sets: [
          {
            weight: 20,
            reps: 12,
          },
          {
            weight: 50,
            reps: 12,
          },
          {
            weight: 70,
            reps: 12,
          },
          {
            weight: 70,
            reps: 12,
          },
        ],
      },
    ],
  },
  {
    date: new Date(2024, 8, 20),
    exercises: [
      {
        exerciseName: 'Flat barbell bench press',
        exerciseType: ExerciseType.WEIGHT_REPS,
        sets: [
          {
            weight: 20,
            reps: 12,
          },
          {
            weight: 50,
            reps: 12,
          },
          {
            weight: 70,
            reps: 12,
          },
          {
            weight: 70,
            reps: 12,
          },
        ],
      },
    ],
  },
  {
    date: new Date(2024, 8, 24),
    exercises: [
      {
        exerciseName: 'Flat barbell bench press',
        exerciseType: ExerciseType.WEIGHT_REPS,
        sets: [
          {
            weight: 20,
            reps: 12,
          },
          {
            weight: 50,
            reps: 12,
          },
          {
            weight: 70,
            reps: 12,
          },
          {
            weight: 70,
            reps: 12,
          },
        ],
      },
    ],
  },
  {
    date: new Date(2024, 8, 27),
    exercises: [
      {
        exerciseName: 'Running',
        exerciseType: ExerciseType.DISTANCE_TIME,
        sets: [
          {
            distance: 1500,
            time: 50,
          },
          {
            distance: 1500,
            time: 50,
          },
          {
            distance: 1500,
            time: 50,
          },
        ],
      },
    ],
  },
];
