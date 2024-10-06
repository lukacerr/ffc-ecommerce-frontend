import { useState } from 'react';
import useHandler from './useHandler.hook';

export interface IUseConfirmModal<T> {
  open: boolean;
  loading: boolean;
  error: Error | null;
  onConfirm: (event?: React.FormEvent<HTMLFormElement>) => Promise<unknown | undefined>;
  dispatch: (v: T) => void;
  close: () => void;
}

export default function useConfirmModal<T>(handleConfirm: (p: T) => Promise<unknown>) {
  const [metadata, setMetadata] = useState<T | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = (v: T) => [setMetadata(v), setOpen(true)];
  const close = () => setOpen(false);

  const { submit, error, loading } = useHandler(async () => {
    await handleConfirm(metadata as T);
    close();
  });

  return { open, loading, error, onConfirm: submit, dispatch, close };
}
