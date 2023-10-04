export const hasErrorMessage = (x: unknown): x is { error_message: string; } => {
  return Boolean(
    typeof x === 'object' &&
    x &&
    'error_message' in x &&
    typeof x.error_message === 'string',
  );
};
