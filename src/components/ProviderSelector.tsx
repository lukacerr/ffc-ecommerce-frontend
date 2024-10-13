import ProveedoresGet from '@/api/proveedores/proveedores.get';
import { Add, Delete, Edit } from '@mui/icons-material';
import {
  TextField,
  Autocomplete,
  TextFieldProps,
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import DeleteProviderModal from './modals/DeleteProviderModal';
import useConfirmModal from '@/hooks/useConfirmModal.hook';
import Proveedor from '@/types/proveedor.interface';
import ProveedorDelete from '@/api/proveedores/proveedor.delete';
import ProviderModal from './modals/ProviderModal';
import ProveedorPost from '@/api/proveedores/proveedor.post';
import ProveedorPut from '@/api/proveedores/proveedor.put';
import { useMemo } from 'react';

export type IProviderSelectorProps = TextFieldProps & {
  onChange: (e: { target: { id: string; value: number } }) => void;
};

export default function ProviderSelector(props: IProviderSelectorProps) {
  const { data, refetch } = useQuery({
    queryKey: [ProveedoresGet.name],
    queryFn: ProveedoresGet,
  });

  const provider = useMemo(() => data?.find((v) => v.idProveedor === props.value) ?? null, [props.value, data]);
  const handleChange = (value: number) => props.onChange({ target: { id: props.id ?? 'idProveedor', value } });

  const deleteModal = useConfirmModal<Partial<Proveedor>>(async (p) =>
    ProveedorDelete(p?.idProveedor || 0).then(() => refetch())
  );

  const couModal = useConfirmModal<Partial<Proveedor>>(
    async (p) => (p?.idProveedor ? ProveedorPut(p.idProveedor, p) : ProveedorPost(p)).then(() => refetch()),
    { nombre: '', cuit: '' }
  );

  return (
    <Box display={'flex'} gap={2}>
      <DeleteProviderModal handler={deleteModal} />
      <ProviderModal handler={couModal} base={provider} />
      <Autocomplete
        options={data || []}
        value={provider}
        fullWidth
        onChange={(_, v) => handleChange(v?.idProveedor || 0)}
        renderInput={(params) => <TextField label="Proveedor" {...props} {...params} />}
        getOptionLabel={(p) => `${p.nombre || ''} ${p.cuit ? `(${p.cuit})` : ''}`}
        renderOption={({ key, ...props }, p) => (
          <ListItem
            key={key}
            {...props}
            secondaryAction={
              <>
                <IconButton onClick={() => couModal.dispatch(p)}>
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => deleteModal.dispatch(p)}>
                  <Delete />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={p.nombre || '-'}
              secondary={p.cuit || '-'}
              secondaryTypographyProps={{ color: 'primary' }}
            />
          </ListItem>
        )}
      />
      <Button variant="contained" onClick={() => couModal.dispatch({ nombre: '', cuit: '' })}>
        <Add />
      </Button>
    </Box>
  );
}
