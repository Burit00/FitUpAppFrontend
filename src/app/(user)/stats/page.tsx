'use client';

import React, { useState } from 'react';
import { useExerciseCategories } from '@features/workouts/hooks/useExerciseCategories';
import {
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@components/ui';
import { useExercises } from '@features/workouts/hooks';
import { Loader } from '@components/Loader';
import { TExercise } from '@features/workouts/types';
import { cn } from '@/utils';
import { ExerciseProgressChartDialog } from '@features/workouts/components/exercises';

export default function StatsPage() {
  const { categories, selectedCategoryId, handleSelectCategory } = useExerciseCategories();
  const { exercises, setExerciseSearch, isLoading } = useExercises({ selectedCategoryId });

  const [selectedExercise, setSelectedExercise] = useState<TExercise | undefined>(undefined);

  return (
    <div className={'w-full flex flex-col gap-2'}>
      <div className={'flex items-end gap-2 w-full p-4 pb-4 bg-background2 rounded'}>
        <Input
          label={'Szukaj ćwiczenia'}
          fieldClassName={'w-full max-w-[400px]'}
          onChange={(e) => setExerciseSearch(e.target.value)}
        />
        <Select
          onValueChange={(value) => {
            handleSelectCategory(value);
          }}
        >
          <SelectTrigger label={'Kategoria'} className={'w-40'}>
            <SelectValue placeholder={'Wszystkie'} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Kategorie</SelectLabel>
              <SelectItem value={'all'} title={'Wszystkie'}>
                {'Wszystkie'}
              </SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id} title={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className={'grid md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-y-auto'}>
        {exercises &&
          exercises.map((exercise) => (
            <div
              key={exercise.id}
              onClick={() => setSelectedExercise(exercise)}
              className={cn(
                'bg-background2 p-2 rounded hover:cursor-pointer transition duration-300',
                exercise.id === selectedExercise?.id && 'bg-background2/40 text-primary'
              )}
            >
              {exercise.name}
            </div>
          ))}
        <Loader isLoading={isLoading} />
      </div>
      <ExerciseProgressChartDialog exercise={selectedExercise} onOpenChange={(isOpen) => !isOpen && setSelectedExercise(undefined)}/>
    </div>
  );
}
