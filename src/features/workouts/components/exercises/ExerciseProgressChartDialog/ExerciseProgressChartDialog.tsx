import { FC, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui';
import { TExercise, TExerciseAnalyticData, TExerciseDetails, TSetParameterName } from '@features/workouts/types';
import { getExerciseById } from '@features/workouts/actions/queries/get-exercise-by-id.http';
import { Loader } from '@components/Loader';
import {
  getExerciseAnalyticData,
  GetExerciseAnalyticDataHttpParams,
} from '@features/workouts/actions/queries/get-exercise-analytic-data.http';
import ExerciseProgressChart from '@features/workouts/components/exercises/ExerciseProgressChartDialog/ExerciseProgressChart';
import { toDateOnly } from '@/utils/date';

function isSelectItemDisabled(setParameterName: string, exercise: TExerciseDetails) {
  return exercise.setParameterNames.every((parameterName) => parameterName.name !== setParameterName);
}

type ExerciseProgressChartDialogBodyProps = {
  exercise: TExerciseDetails;
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
};

const ExerciseProgressChartDialogBody: FC<ExerciseProgressChartDialogBodyProps> = ({
  exercise,
  isLoading,
  setIsLoading,
}: ExerciseProgressChartDialogBodyProps) => {
  const [parameter, setParameter] = useState<TSetParameterName | undefined>(undefined);
  const [requestParameters, setRequestParameters] = useState<GetExerciseAnalyticDataHttpParams | undefined>(undefined);
  const [chartData, setChartData] = useState<TExerciseAnalyticData[] | undefined>(undefined);

  useEffect(() => {
    if (!parameter) return;

    setIsLoading(true);
    getExerciseAnalyticData({
      exerciseId: exercise.id,
      parameterName: parameter,
    }).then(async (response) => {
      if (!response.ok) return;

      const data = await response.json();
      setChartData(
        data.values.map((item: { date: string; value: number }) => ({
          ...item,
          date: toDateOnly(new Date(item.date)),
        }))
      );
    }).finally(() => setIsLoading(false));
  }, [requestParameters]);

  return (
    <DialogContent className={'w-full md:w-[90%] max-w-none'}>
      <DialogHeader>
        <DialogTitle>{exercise.name}</DialogTitle>
        <DialogDescription>
          Analiza wyników ćwiczenia <b>{exercise.name}</b>.
        </DialogDescription>
      </DialogHeader>
      <div className={'flex flex-col gap-2'}>
        <Select onValueChange={(val) => setParameter(val as TSetParameterName)} value={parameter}>
          <SelectTrigger className={'w-fit gap-2'}>
            <SelectValue placeholder={'Wybierz parametr'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={'weight'} disabled={isSelectItemDisabled('weight', exercise)}>
              Ciężar
            </SelectItem>
            <SelectItem value={'distance'} disabled={isSelectItemDisabled('distance', exercise)}>
              Dystans
            </SelectItem>
            {/*<SelectItem value={'reps'} disabled={isSelectItemDisabled('reps', exercise)}>Powtórzenia</SelectItem>*/}
            {/*<SelectItem value={'time'} disabled={isSelectItemDisabled('time', exercise)}>Czas</SelectItem>*/}
          </SelectContent>
        </Select>
        <div className={'relative p-2'}>
          {requestParameters && chartData && (
            <ExerciseProgressChart chartData={chartData} requestParameters={requestParameters}></ExerciseProgressChart>
          )}
          <Loader isLoading={isLoading} />
        </div>
      </div>
      <DialogFooter>
        <Button
          isLoading={isLoading}
          disabled={isLoading || !parameter}
          onClick={() => {
            setChartData(undefined);
            setRequestParameters({ exerciseId: exercise.id, parameterName: parameter ?? 'weight' });
          }}
        >
          Generuj wykres
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

type ExerciseProgressChartDialogProps = {
  exercise: TExercise | undefined;
  onOpenChange: (open: boolean) => void;
};

export const ExerciseProgressChartDialog: FC<ExerciseProgressChartDialogProps> = (
  props: ExerciseProgressChartDialogProps
) => {
  const [exercise, setExercise] = useState<TExerciseDetails>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!props.exercise) {
      setExercise(undefined);

      return;
    }

    setIsLoading(true);
    getExerciseById(props.exercise.id)
      .then(async (response) => {
        if (!response.ok) return;

        const data = await response.json();
        setExercise(data);
      })
      .finally(() => setIsLoading(false));
  }, [props.exercise]);

  return (
    <Dialog open={!!props.exercise} onOpenChange={props.onOpenChange} modal>
      {exercise ? <ExerciseProgressChartDialogBody exercise={exercise} isLoading={isLoading} setIsLoading={setIsLoading} /> : null}
    </Dialog>
  );
};
