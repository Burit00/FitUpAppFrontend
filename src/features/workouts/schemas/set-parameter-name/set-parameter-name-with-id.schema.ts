import { z } from 'zod';
import { SET_PARAMETER_NAMES_ORDER_MAP } from '@features/workouts/maps/set-parameter-names-order.map';
import { TSetParameterNameWithId, TSetParameterNameWithValue } from '@features/workouts/types';
import { TimeSpan, TimeSpanString } from '@/types/TimeSpan';

const WeightParameterSchema = z.literal('weight');
const RepsParameterSchema = z.literal('reps');
const DistanceParameterSchema = z.literal('distance');
const TimeParameterSchema = z.literal('time');

export const SetParameterNameSchema = z.union([
  WeightParameterSchema,
  RepsParameterSchema,
  DistanceParameterSchema,
  TimeParameterSchema,
]);

export const SetParameterNameWithIdSchema = z.object({
  id: z.string().uuid(),
  name: SetParameterNameSchema,
});

export const SetParameterTimeWithValueSchema = z.object({
  id: z.string().uuid(),
  name: TimeParameterSchema,
  value: z
    .string()
    .or(z.instanceof(TimeSpan))
    .transform((data: string | TimeSpan): TimeSpan => {
      if (data instanceof TimeSpan) return new TimeSpan(data);

      return new TimeSpan(data as TimeSpanString);
    }),
});

export const SetParameterNameWithValueSchema = z
  .object({
    id: z.string().uuid(),
    name: z.union([WeightParameterSchema, RepsParameterSchema, DistanceParameterSchema]),
    value: z
      .string()
      .or(z.number())
      .transform((data: string | number): number => parseFloat(data.toString())),
  })
  .or(SetParameterTimeWithValueSchema);

function orderParameters(
  parameters: TSetParameterNameWithId[] | TSetParameterNameWithValue[],
): TSetParameterNameWithId[] | TSetParameterNameWithValue[] {
  return parameters.sort(
    (parameterA: TSetParameterNameWithValue, parameterB: TSetParameterNameWithValue): number =>
      SET_PARAMETER_NAMES_ORDER_MAP.get(parameterA.name) - SET_PARAMETER_NAMES_ORDER_MAP.get(parameterB.name),
  );
}

export const SetParameterNameWithIdArraySchema = z
  .array(SetParameterNameWithIdSchema)
  .transform((data: TSetParameterNameWithId[]) => orderParameters(data) as TSetParameterNameWithId[]);
export const SetParameterNameWithValueArraySchema = z
  .array(SetParameterNameWithValueSchema)
  .transform((data: TSetParameterNameWithValue[]) => orderParameters(data) as TSetParameterNameWithValue[]);
