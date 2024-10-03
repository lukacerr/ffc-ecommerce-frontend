import { useState } from 'react';

export default function useHandler(handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<unknown>) {
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    return await handleSubmit(event)
      .catch((e) => [setError(e), console.error(e)])
      .finally(() => setLoading(false));
  };

  return { submit, error, loading };
}
