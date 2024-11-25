import React, { FC, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui';
import { FaTrash } from 'react-icons/fa6';
import { TWorkoutExercise } from '@features/workouts/types';

type DeleteWorkoutExerciseButtonProps = {
  workoutExercise: TWorkoutExercise;
  onDelete: () => void;
  className?: string;
};

const DeleteWorkoutExerciseButton: FC<DeleteWorkoutExerciseButtonProps> = ({
  workoutExercise,
  onDelete,
  ...props
}: DeleteWorkoutExerciseButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={'destructive'}
          size={'icon'}
          className={props.className}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <FaTrash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Usuń ćwiczenie</DialogTitle>
          <DialogDescription>
            Czy na pewno chcesz usunąć ćwiczenie <b className={'text-primary'}>{workoutExercise.name}</b> z tego
            treningu?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={'ghost'} onClick={() => setOpen(false)}>
            Anuluj
          </Button>
          <Button
            variant={'destructive'}
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
          >
            Usuń
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteWorkoutExerciseButton;
