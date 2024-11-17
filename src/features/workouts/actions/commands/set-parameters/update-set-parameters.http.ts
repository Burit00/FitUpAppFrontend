import { TUpdateSetParameter } from '@features/workouts/types';
import { FitUpHttpClient } from '@api';

export function updateSetParameters(setParameters: TUpdateSetParameter): Promise<Response> {
  const preparedData = {
    ...setParameters,
    parameters: setParameters.parameters.map((parameter) => {
      return {
        ...parameter,
        value: parameter.value.toString(),
      };
    }),
  };

  return FitUpHttpClient.put('set-parameters', preparedData);
}
