import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui';
import { DistanceTime, Exercise, ExerciseType, WeightReps, Workout } from '@/app/calendar/mocks/workouts';
import { FaCircle, FaX } from 'react-icons/fa6';

const TwoParamRow = ({ param1, param2 }: { param1: string; param2: string }) => {
  return (
    <div className={'flex flex-col items-center justify-center relative'}>
      <span className={'text-nowrap text-foreground/80 absolute right-full -translate-x-[10px]'}>{param1}</span>
      <FaX className={'text-primary'} />
      <span className={'text-nowrap text-foreground/80 absolute left-full translate-x-[10px]'}>{param2}</span>
    </div>
  );
};

type WeightAndRepsRowProps = {
  set: WeightReps;
};

const WeightAndRepsRow = ({ set }: WeightAndRepsRowProps) => {
  return <TwoParamRow param1={`${set.weight} kg`} param2={`${set.reps} reps`} />;
};

type DistanceAndTimeRowProps = {
  set: DistanceTime;
};

const DistanceAndTimeRow = ({ set }: DistanceAndTimeRowProps) => {
  return <TwoParamRow param1={`${set.distance} m`} param2={`${set.time}s`} />;
};

type ExerciseElementProps = {
  exercise: Exercise;
};
const ExerciseElement = ({ exercise }: ExerciseElementProps) => {
  return (
    <li className={'flex flex-col w-full'}>
      <div className={'flex items-center gap-2'}>
        <FaCircle className={'text-primary size-3'} />
        <h3 className={'underline mb-0 text-xl'}>{exercise.name}</h3>
      </div>
      <ul className={'w-full flex flex-col items-center gap-2'}>
        {exercise.exerciseType === ExerciseType.WEIGHT_REPS &&
          exercise.sets.map((set, index) => {
            return <WeightAndRepsRow key={index} set={set} />;
          })}
        {exercise.exerciseType === ExerciseType.DISTANCE_TIME &&
          exercise.sets.map((set, index) => {
            return <DistanceAndTimeRow key={index} set={set} />;
          })}
      </ul>
    </li>
  );
};

type WorkoutDialogProps = {
  workout: Workout;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const WorkoutDialog = ({ workout, ...props }: WorkoutDialogProps) => {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
      <DialogContent className={'flex flex-col max-h-[80vh] w-full md:max-h-[80vh] md:w-[600px]'}>
        <DialogHeader>
          <DialogTitle>
            <h2 className={'text-primary text-xl md:text-3xl'}>
              {new Date(workout?.date).toLocaleDateString('pl-PL', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </h2>
          </DialogTitle>
          {workout?.exercises.length === 0 && <DialogDescription>W tym dniu nie dodano treningów.</DialogDescription>}
        </DialogHeader>
        <div className={'flex flex-col flex-grow overflow-x-auto'}>
          {workout?.exercises.map((exercise) => <ExerciseElement key={exercise.name} exercise={exercise} />)}
        </div>
        <DialogFooter>
          <Button variant={'ghost'} onClick={() => props.onOpenChange(false)}>
            Anuluj
          </Button>
          <Button>Przejdź</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkoutDialog;
