import { z } from 'zod';
import { SET_PARAMETER_NAMES_ORDER_MAP } from '@features/workouts/maps/set-parameter-names-order.map';
import { TSetParameterName, TSetParameterNameWithValue } from '@features/workouts/types';
import { TimeSpan, TimeSpanString } from '@/types/TimeSpan';

const WeightParameterSchema = z.literal('weight');
const RepsParameterSchema = z.literal('reps');
const DistanceParameterSchema = z.literal('distance');
const TimeParameterSchema = z.literal('time');

export const SetParameterNameSchema = z.object({
  id: z.string().uuid(),
  name: z.union([WeightParameterSchema, RepsParameterSchema, DistanceParameterSchema, TimeParameterSchema]),
});

export const SetParameterTimeWithValueSchema = z.object({
  id: z.string().uuid(),
  name: TimeParameterSchema,
  value: z.string().transform((data: string): TimeSpan => new TimeSpan(data as TimeSpanString)),
});

export const SetParameterNameWithValueSchema = z
  .object({
    id: z.string().uuid(),
    name: z.union([WeightParameterSchema, RepsParameterSchema, DistanceParameterSchema]),
    value: z.string().transform((data: string): number => parseFloat(data.toString())),
  })
  .or(SetParameterTimeWithValueSchema);

function orderParameters(
  parameters: TSetParameterName[] | TSetParameterNameWithValue[],
): TSetParameterName[] | TSetParameterNameWithValue[] {
  return parameters.sort(
    (parameterA: TSetParameterNameWithValue, parameterB: TSetParameterNameWithValue): number =>
      SET_PARAMETER_NAMES_ORDER_MAP.get(parameterA.name) - SET_PARAMETER_NAMES_ORDER_MAP.get(parameterB.name),
  );
}

export const SetParameterNameArraySchema = z
  .array(SetParameterNameSchema)
  .transform((data: TSetParameterName[]) => orderParameters(data) as TSetParameterName[]);
export const SetParameterNameWithValueArraySchema = z
  .array(SetParameterNameWithValueSchema)
  .transform((data: TSetParameterNameWithValue[]) => orderParameters(data) as TSetParameterNameWithValue[]);
