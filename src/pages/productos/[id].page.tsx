import ProductoDelete from '@/api/productos/producto.delete';
import ProductoGet from '@/api/productos/producto.get';
import ProductoPost from '@/api/productos/producto.post';
import ProductoPut from '@/api/productos/producto.put';
import Layout from '@/components/layout';
import { NavPage } from '@/components/layout/constants';
import DeleteProductModal from '@/components/modals/DeleteProductModal';
import useConfirmModal from '@/hooks/useConfirmModal.hook';
import useHandler from '@/hooks/useHandler.hook';
import Producto, { allCategories, allSizes } from '@/types/producto.class';
import { ArrowLeft, Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Chip,
  Divider,
  InputAdornment,
  Paper,
  Slider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import FormValidation, { Validation } from '@/utils/form-validation.utils';
import Big from 'big.js';

export default function ProductoIdPage() {
  const navigate = useNavigate();
  const { id: idv } = useParams<{ id: string }>();
  const id = useMemo<number>(() => (!idv || idv === 'nuevo' ? 0 : Number(idv)), [idv]);

  const [value, setValue] = useState<Partial<Producto>>(new Producto());

  const onChangeRaw = (id: keyof Producto, value: unknown, validation?: Validation) =>
    (!validation || FormValidation(validation)(value)) && setValue((pv) => ({ ...pv, [id]: value }));

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, validation?: Validation) =>
    onChangeRaw(e.target.id as keyof Producto, e.target.value, validation);

  const getHandler = useHandler(async () => ProductoGet(id).then((v) => setValue(v)));
  useEffect(() => {
    if (id) getHandler.submit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const submitHandler = useHandler(async () =>
    (id ? ProductoPut(id, value) : ProductoPost(value)).then(() => navigate('/productos'))
  );

  const deleteModal = useConfirmModal<Partial<Producto>>(async (p) =>
    ProductoDelete(p?.idProducto || 0).then(() => navigate('/productos'))
  );

  const error = useMemo(
    () => getHandler.error || deleteModal.error || submitHandler.error,
    [getHandler.error, deleteModal.error, submitHandler.error]
  );

  const fnLoading = useMemo(
    () => submitHandler.loading || deleteModal.loading,
    [submitHandler.loading, deleteModal.loading]
  );

  return (
    <Layout
      id={NavPage.PRODUCTS}
      header={`Gestión de productos ｜ ${!id ? 'Creación' : 'Edición'}`}
      metadata={{ title: !id ? 'Crear producto' : 'Editar producto' }}
      error={error}
      loading={getHandler.loading}
    >
      <DeleteProductModal handler={deleteModal} />
      <Button
        startIcon={<ArrowLeft />}
        disabled={fnLoading}
        onClick={() => navigate('/productos')}
        color="primary"
        variant="text"
      >
        Volver
      </Button>
      <form onSubmit={submitHandler.submit}>
        <Paper variant="outlined" sx={{ p: 4, mb: 2, mt: 1 }}>
          <Divider sx={{ p: 2, mb: 2 }}>
            <Chip label={'Información básica'} size="small" />
          </Divider>
          <Grid container spacing={2} display="flex" justifyContent="center" alignItems="center">
            <Grid size={{ sm: 12, md: 6 }}>
              <TextField onChange={onChange} label="Nombre" id="nombre" value={value.nombre} required fullWidth />
            </Grid>
            <Grid size={{ sm: 12, md: 6 }}>
              {/* FIXME: idProveedor: number; */}
              <TextField
                onChange={onChange}
                label="Proveedor"
                id="idProveedor"
                value={value.idProveedor}
                required
                fullWidth
              />
            </Grid>
            <Grid size={{ sm: 12, md: 12 }}>
              <TextField
                variant="filled"
                onChange={onChange}
                label="Descripción"
                id="descripcion"
                value={value.descripcion}
                fullWidth
                multiline
              />
            </Grid>
          </Grid>

          <Divider sx={{ p: 2, my: 2 }}>
            <Chip label={'Valores y descuentos'} size="small" />
          </Divider>
          <Grid container columnSpacing={4} rowSpacing={2} display="flex" justifyContent="center" alignItems="center">
            <Grid size={{ sm: 12, md: 6 }}>
              <TextField
                onChange={(e) => onChange(e, Validation.NUMBER)}
                label="Precio de venta"
                id="precioVenta"
                variant="standard"
                value={value.precioVenta}
                required
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  },
                }}
              />
            </Grid>
            <Grid size={{ sm: 12, md: 6 }}>
              <TextField
                onChange={(e) => onChange(e, Validation.NUMBER)}
                label="Precio de compra"
                id="precioCompra"
                variant="standard"
                value={value.precioCompra}
                required
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  },
                }}
              />
            </Grid>

            <Grid size={{ sm: 12, md: 4 }}>
              <Typography color="success" variant="caption" gutterBottom>
                🏷️ en efectivo
              </Typography>
              <Slider
                value={value.descuentoEfectivo}
                max={0.99}
                step={0.01}
                onChange={(_, v) => onChangeRaw('descuentoEfectivo', Array.isArray(v) ? v[0] : v)}
                valueLabelDisplay="auto"
                valueLabelFormat={(v) => `${Big(v * 100).toFixed(0)}%`}
              />
            </Grid>

            <Grid size={{ sm: 12, md: 4 }}>
              <Typography color="success" variant="caption" gutterBottom>
                🏷️ para socios
              </Typography>
              <Slider
                value={value.descuentoSocios}
                max={0.99}
                step={0.01}
                onChange={(_, v) => onChangeRaw('descuentoSocios', Array.isArray(v) ? v[0] : v)}
                valueLabelDisplay="auto"
                valueLabelFormat={(v) => `${Big(v * 100).toFixed(0)}%`}
              />
            </Grid>

            <Grid size={{ sm: 12, md: 4 }}>
              <Typography color="success" variant="caption" gutterBottom>
                🏷️ para NO socios
              </Typography>
              <Slider
                value={value.descuentoNoSocios}
                max={0.99}
                step={0.01}
                onChange={(_, v) => onChangeRaw('descuentoNoSocios', Array.isArray(v) ? v[0] : v)}
                valueLabelDisplay="auto"
                valueLabelFormat={(v) => `${Big(v * 100).toFixed(0)}%`}
              />
            </Grid>
          </Grid>
          <Divider sx={{ p: 2, my: 2 }}>
            <Chip label={'Stock & detalles'} size="small" />
          </Divider>
          <Grid container spacing={2} display="flex" justifyContent="center" alignItems="center">
            <Grid size={{ sm: 12, md: 6 }}>
              <TextField
                onChange={(e) => onChange(e, Validation.NUMBER)}
                label="Stock actual"
                id="stockActual"
                value={value.stockActual}
                required
                fullWidth
                variant="filled"
              />
            </Grid>
            <Grid size={{ sm: 12, md: 6 }}>
              <TextField
                onChange={(e) => onChange(e, Validation.NUMBER)}
                label="Stock mínimo"
                id="stockMinimo"
                value={value.stockMinimo}
                required
                fullWidth
                variant="filled"
              />
            </Grid>
            <Grid size={{ sm: 12, md: 6 }} display="flex" justifyContent="center">
              <ToggleButtonGroup value={value.categoria} exclusive onChange={(_, v) => onChangeRaw('categoria', v)}>
                {allCategories.map((v) => (
                  <ToggleButton key={v.value} value={v.value}>
                    {v.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Grid>

            <Grid size={{ sm: 12, md: 6 }} display="flex" justifyContent="center">
              <ToggleButtonGroup value={value.talles} onChange={(_, v) => onChangeRaw('talles', v)}>
                {allSizes.map((v) => (
                  <ToggleButton key={v.value} value={v.value}>
                    {v.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Grid>

            <Grid size={{ sm: 12 }}>
              <TextField
                variant="standard"
                onChange={(e) => onChangeRaw('caracteristicas', e.target.value.split(','))}
                label="Características (separar por coma)"
                id="caracteristicas"
                value={value.caracteristicas?.join(',')}
                fullWidth
                multiline
              />
            </Grid>
          </Grid>
        </Paper>

        <Box display="flex" gap={2} width={'100%'} justifyContent={'end'}>
          {!!id && (
            <LoadingButton
              startIcon={<Save />}
              disabled={fnLoading}
              loading={deleteModal.loading}
              onClick={() => deleteModal.dispatch(value)}
              color="error"
              variant="outlined"
            >
              Eliminar
            </LoadingButton>
          )}
          <LoadingButton
            startIcon={<Save />}
            disabled={fnLoading}
            loading={submitHandler.loading}
            type="submit"
            color="success"
            variant="contained"
          >
            Guardar
          </LoadingButton>
        </Box>
      </form>
    </Layout>
  );
}
