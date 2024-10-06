import { useState } from 'react';

export default function useHandler<T>(handleSubmit: (event?: React.FormEvent<HTMLFormElement>) => Promise<T>) {
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event?: React.FormEvent<HTMLFormElement>): Promise<T | undefined> => {
    if (event) event.preventDefault();
    setLoading(true);

    try {
      return await handleSubmit(event);
    } catch (e: unknown) {
      setError(e as Error);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return { submit, error, loading };
}
