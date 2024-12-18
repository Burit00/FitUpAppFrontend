import React, { FC } from 'react';
import { TSetParameterNameWithIdArray, TWorkoutSet } from '@features/workouts/types';
import { MEASURES_MAP } from '@features/workouts/maps/measures.map';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui';
import { SET_PARAMETER_NAMES_TRANSLATION_MAP } from '@features/workouts/maps';

type WorkoutSetSheetTableProps = {
  parameters: TSetParameterNameWithIdArray;
  sets: TWorkoutSet[];
  activeSet?: TWorkoutSet;
  onRowClick: (set: TWorkoutSet) => void;
};

export const WorkoutSetSheetTable: FC<WorkoutSetSheetTableProps> = ({ parameters, sets, activeSet, onRowClick }) => {
  return (
    <Table className={'table-fixed w-full relative'}>
      <TableHeader className={'sticky top-0 z-[50] bg-background'}>
        <TableRow>
          {parameters.map((parameter, index) => (
            <React.Fragment key={parameter.id}>
              <TableHead key={parameter.id} className={'text-center'}>
                {SET_PARAMETER_NAMES_TRANSLATION_MAP.get(parameter.name)}
              </TableHead>
              {parameters.length - 1 !== index && <TableCell className={'text-center w-0'}></TableCell>}
            </React.Fragment>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sets.map((set) => (
          <TableRow
            key={set.id}
            tabIndex={0}
            data-selected={set === activeSet}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onRowClick(set);
            }}
            className={'hover:cursor-pointer'}
            onClick={() => onRowClick(set)}
          >
            {set.parameters.map((parameter, index) => (
              <React.Fragment key={parameter.id}>
                <TableCell key={parameter.id} className={'text-center'}>
                  {parameter.value.toString()}
                  {MEASURES_MAP.get(parameter.name)}
                </TableCell>
                {set.parameters.length - 1 !== index && (
                  <TableCell className={' text-center text-muted-foreground'}>x</TableCell>
                )}
              </React.Fragment>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
