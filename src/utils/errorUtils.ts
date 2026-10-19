export const resolveErrorMessage = (isError: boolean, error: unknown): string | null => {
    if (!isError) {
      return null;
    }

    if (error instanceof Error && error.message.startsWith('errors.')) {
      return error.message;
    }

    return 'errors.loadCharacter';
  };