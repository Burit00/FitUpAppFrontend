import React, { FC } from 'react';
import { Button } from '@components/ui';

type WorkoutSetFormButtonsProps = {
  type: 'create' | 'update';
  onResetForm: () => void;
  onRemoveSet: () => void;
};

export const WorkoutSetFormButtons: FC<WorkoutSetFormButtonsProps> = ({
  type,
  onResetForm,
  onRemoveSet,
}: WorkoutSetFormButtonsProps) => {
  switch (type) {
    case 'create':
      return (
        <>
          <Button type={'submit'}>Dodaj serię</Button>
          <Button type={'reset'} variant={'outline'} onClick={onResetForm}>
            Resetuj wartości
          </Button>
        </>
      );
    case 'update':
      return (
        <>
          <Button type={'submit'}>Zapisz zmiany</Button>
          <Button variant={'destructive'} onClick={onRemoveSet}>
            Usuń serię
          </Button>
        </>
      );
  }
};
