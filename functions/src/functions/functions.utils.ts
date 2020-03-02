import { debug } from '@utils/essentials.utils';

export function handleFunctionError(error: Error) {
  debug(error, true);
}
