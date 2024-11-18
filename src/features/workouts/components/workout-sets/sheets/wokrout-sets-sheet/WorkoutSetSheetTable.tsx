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
    <Table className={'table-fixed w-full'}>
      <TableHeader>
        <TableRow>
          {parameters.map((parameter, index) => (
            <>
              <TableHead key={parameter.id} className={'text-center'}>
                {SET_PARAMETER_NAMES_TRANSLATION_MAP.get(parameter.name)}
              </TableHead>
              {parameters.length - 1 !== index && <TableCell className={'text-center w-0'}></TableCell>}
            </>
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
            onClick={() => onRowClick(set)}
          >
            {set.parameters.map((parameter, index) => (
              <>
                <TableCell key={parameter.id} className={'text-center'}>
                  {parameter.value.toString()}
                  {MEASURES_MAP.get(parameter.name)}
                </TableCell>
                {set.parameters.length - 1 !== index && (
                  <TableCell className={' text-center text-muted-foreground'}>x</TableCell>
                )}
              </>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    // <table>
    //   <thead>
    //     <tr>
    //       {parameters.map((parameter, index) => (
    //         <>
    //           <th key={parameter.name}>{parameter.name}</th>
    //           {parameters.length - 1 !== index && <th></th>}
    //         </>
    //       ))}
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {sets.map((set) => (
    //       <tr key={set.id} className={'rounded border border-primary border-solid px-2 py-2'}>
    //         {set.parameters.map((setParameter, index) => (
    //           <>
    //             <td key={setParameter.id}>
    //               {setParameter.value.toString()} {MEASURES_MAP.get(setParameter.name)}
    //             </td>
    //             {set.parameters.length - 1 !== index && <th>x</th>}
    //           </>
    //         ))}
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
  );
};
