import ProductoDelete from '@/api/productos/producto.delete';
import ProductoGet from '@/api/productos/producto.get';
import ProductoPost from '@/api/productos/producto.post';
import ProductoPut from '@/api/productos/producto.put';
import Layout from '@/components/layout';
import { NavPage } from '@/components/layout/constants';
import DeleteProductModal from '@/components/modals/DeleteProductModal';
import useConfirmModal from '@/hooks/useConfirmModal.hook';
import useHandler from '@/hooks/useHandler.hook';
import Producto from '@/types/producto.class';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Paper } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid2';

export default function ProductoIdPage() {
  const navigate = useNavigate();
  const { id: idv } = useParams<{ id: string }>();
  const id = useMemo<number>(() => (!idv || idv === 'nuevo' ? 0 : Number(idv)), [idv]);

  const [value, setValue] = useState<Producto>(new Producto());

  const getHandler = useHandler(async () => ProductoGet(id).then((v) => setValue(v)));
  useEffect(() => {
    if (id) getHandler.submit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const submitHandler = useHandler(async () =>
    (id ? ProductoPut(id, value) : ProductoPost(value)).then(() => navigate('/productos'))
  );

  const deleteModal = useConfirmModal<Producto>(async (p) =>
    ProductoDelete(p.idProducto).then(() => navigate('/productos'))
  );

  const error = useMemo(
    () => getHandler.error || deleteModal.error || submitHandler.error,
    [getHandler.error, deleteModal.error, submitHandler.error]
  );

  const fnLoading = useMemo(
    () => submitHandler.loading || deleteModal.loading,
    [submitHandler.loading, deleteModal.loading]
  );

  // TODO: Form y submit handling

  return (
    <Layout
      id={NavPage.PRODUCTS}
      header={`Gestión de productos ｜ ${!id ? 'Creación' : 'Edición'}`}
      metadata={{ title: !id ? 'Crear producto' : 'Editar producto' }}
      error={error}
      loading={getHandler.loading}
    >
      <DeleteProductModal handler={deleteModal} />
      <form onSubmit={submitHandler.submit}>
        <Paper variant="outlined" sx={{ p: 2, m: 2 }}>
          <Grid container spacing={2} display="flex" justifyContent="center" alignItems="center">
            <Grid size={{ sm: 12, md: 4 }}></Grid>
          </Grid>
        </Paper>

        <p>{JSON.stringify(value)}</p>
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
      </form>
    </Layout>
  );
}
