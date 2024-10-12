import ProveedoresGet from '@/api/proveedores/proveedores.get';
import { TextField, Autocomplete, TextFieldProps } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

export type IProviderSelectorProps = TextFieldProps & {
  onChange: (e: { target: { id: string; value: number } }) => void;
};

export default function ProviderSelector(props: IProviderSelectorProps) {
  const { data } = useQuery({
    queryKey: [ProveedoresGet.name],
    queryFn: ProveedoresGet,
  });

  const handleChange = (value: number) => props.onChange({ target: { id: props.id ?? 'idProveedor', value } });

  // TODO: Eliminar y crear proveedores

  return (
    <Autocomplete
      options={data || []}
      value={data?.find((v) => v.idProveedor === props.value) || null}
      fullWidth
      onChange={(_, v) => handleChange(v?.idProveedor || 0)}
      renderInput={(params) => <TextField label="Proveedor" {...props} {...params} />}
      getOptionLabel={(option) => option.nombre || ''}
    />
  );
}
