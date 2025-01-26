import { ChartConfig, ChartContainer } from '@components/ui/chart';
import { Area, AreaChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { GetExerciseAnalyticDataHttpParams } from '@features/workouts/actions/queries/get-exercise-analytic-data.http';
import { MEASURES_MAP, SET_PARAMETER_NAMES_TRANSLATION_MAP } from '@features/workouts/maps';
import { TSetParameterName } from '@features/workouts/types';

const parameterMap = new Map<TSetParameterName, string>([
  ['distance', 'Maksymalny dystans(m)'],
  ['weight', 'Maksymalny ciężar na jedno powtórzenie (kg)'],
]);

type ExerciseProgressChartProps = {
  requestParameters: GetExerciseAnalyticDataHttpParams;
  chartData: {
    date: string;
    value: number;
  }[];
};

const ExerciseProgressChart = (props: ExerciseProgressChartProps) => {
  const chartConfig = {
    value: {
      label: parameterMap.get(props.requestParameters.parameterName),
    },
  } satisfies ChartConfig;

  return (
    <div>
      <h4 className={'text-center'}>{parameterMap.get(props.requestParameters.parameterName)}</h4>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <AreaChart data={props.chartData}>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary) / 0.6)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--primary) / 0.2)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" label={'Data'} />
          <YAxis
            unit={MEASURES_MAP.get(props.requestParameters.parameterName)}
            name={SET_PARAMETER_NAMES_TRANSLATION_MAP.get(props.requestParameters.parameterName)}
            allowDataOverflow
          />
          <Legend />
          <Tooltip />
          <Area
            dataKey={'value'}
            label={parameterMap.get(props.requestParameters.parameterName)}
            type={'monotone'}
            stroke={'hsl(var(--primary))'}
            fillOpacity={1}
            fill={'url(#gradient)'}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};
export default ExerciseProgressChart;
