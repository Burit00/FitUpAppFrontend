import React, { FC } from 'react';
import { Button } from '@components/ui';

type WorkoutSetFormButtonsProps = {
  type: 'create' | 'update';
  isLoading: boolean;
  onResetForm: () => void;
  onRemoveSet: () => void;
};

export const WorkoutSetFormButtons: FC<WorkoutSetFormButtonsProps> = ({
  type,
  isLoading,
  onResetForm,
  onRemoveSet,
}: WorkoutSetFormButtonsProps) => {
  switch (type) {
    case 'create':
      return (
        <>
          <Button type={'submit'} isLoading={isLoading}>
            Dodaj serię
          </Button>
          <Button type={'reset'} variant={'outline'} onClick={onResetForm}>
            Resetuj wartości
          </Button>
        </>
      );
    case 'update':
      return (
        <>
          <Button type={'submit'} isLoading={isLoading}>
            Zapisz zmiany
          </Button>
          <Button variant={'destructive'} isLoading={isLoading} onClick={onRemoveSet}>
            Usuń serię
          </Button>
        </>
      );
  }
};
