import ProductoDelete from '@/api/productos/producto.delete';
import ProductosGet from '@/api/productos/productos.get';
import Layout from '@/components/layout';
import { NavPage } from '@/components/layout/constants';
import DeleteProductModal from '@/components/modals/DeleteProductModal';
import SuperTable, { ISuperTableAction } from '@/components/SuperTable';
import useConfirmModal from '@/hooks/useConfirmModal.hook';
import Producto, { allCategories, allSizes, Categoria, getCategoryLabel, Talle } from '@/types/producto.class';
import { toArsString, toPercentageString } from '@/utils/toString.utils';
import { Delete, Edit, InfoOutlined, PlusOne, LocalOffer } from '@mui/icons-material';
import {
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Tooltip,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { MRT_ColumnDef, MRT_RowData } from 'material-react-table';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';

export default function ProductosPage() {
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: [ProductosGet.name],
    queryFn: ProductosGet,
  });

  const deleteModal = useConfirmModal<Producto>(async (p) => ProductoDelete(p.idProducto).then(() => refetch()));

  const { length, alerts } = useMemo(
    () => ({ length: data?.length, alerts: data?.reduce((v, p) => v + (p.hasLowStock ? 1 : 0), 0) }),
    [data]
  );

  const navigate = useNavigate();
  const newProduct = () => navigate('/productos/nuevo');
  const actions = useMemo<ISuperTableAction<Producto>[]>(
    () => [
      {
        title: 'Editar',
        icon: <Edit />,
        handle: ({ row: { original } }) => navigate(`/productos/${original.idProducto}`),
      },
      {
        title: 'Eliminar',
        icon: <Delete />,
        handle: ({ row: { original } }) => deleteModal.dispatch(original),
      },
    ],
    [deleteModal, navigate]
  );

  const columns = useMemo<MRT_ColumnDef<Producto>[]>(
    () => [
      {
        accessorKey: 'idProducto',
        header: 'ID',
        size: 10,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'nombre',
        header: 'Nombre',
        Cell: ({ renderedCellValue, row: { original } }) => (
          <Typography variant="body1" display="flex" alignItems="center">
            {renderedCellValue}
            <Tooltip title={original.descripcion} arrow>
              <InfoOutlined color="primary" fontSize="small" sx={{ ml: 1 }} />
            </Tooltip>
          </Typography>
        ),
        enableColumnFilter: false,
        size: 100,
      },
      {
        accessorKey: 'precioVenta',
        header: '$ Venta',
        size: 75,
        filterVariant: 'range-slider',
        filterFn: 'betweenInclusive',
        muiFilterSliderProps: {
          marks: true,
          valueLabelFormat: toArsString,
        },
        Cell: ({ row: { original } }) => (
          <Typography variant="body1" display="flex" alignItems="center">
            {toArsString(original.precioVenta)}
            <Tooltip
              title={
                <List dense={true} sx={{ p: 0 }}>
                  {original.descuentoEfectivo && (
                    <ListItem sx={{ p: 0 }}>
                      <ListItemText
                        primary={`Efectivo: ${toArsString(
                          original.precioVenta * (1 - original.descuentoEfectivo)
                        )} (-${toPercentageString(original.descuentoEfectivo)})`}
                      />
                    </ListItem>
                  )}
                  {original.descuentoSocios && (
                    <ListItem sx={{ p: 0 }}>
                      <ListItemText
                        primary={`Socios: ${toArsString(
                          original.precioVenta * (1 - original.descuentoSocios)
                        )} (-${toPercentageString(original.descuentoSocios)})`}
                      />
                    </ListItem>
                  )}
                  {original.descuentoNoSocios && (
                    <ListItem sx={{ p: 0 }}>
                      <ListItemText
                        primary={`No socios: ${toArsString(
                          original.precioVenta * (1 - original.descuentoNoSocios)
                        )} (-${toPercentageString(original.descuentoNoSocios)})`}
                      />
                    </ListItem>
                  )}
                  <Divider />
                  <ListItem sx={{ p: 0 }}>
                    <ListItemText
                      primary={
                        <Typography textAlign={'center'} fontWeight={900}>
                          Compra: {toArsString(original.precioCompra)}
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
              }
              arrow
            >
              <LocalOffer color="success" fontSize="small" sx={{ ml: 1 }} />
            </Tooltip>
          </Typography>
        ),
      },
      {
        id: 'stockActual',
        accessorFn: (originalRow) => (originalRow.hasLowStock ? 'true' : 'false'),
        header: 'Stock',
        size: 75,
        enableSorting: false,
        enableColumnFilterModes: false,
        muiFilterCheckboxProps: {
          size: 'small',
        },
        filterVariant: 'checkbox',
        Cell: ({ cell, row: { original } }) => (
          <Typography
            color={cell.getValue<string>() === 'true' ? 'error' : 'primary'}
            fontWeight={cell.getValue<string>() === 'true' ? 900 : 500}
          >
            {original.stockActual}{' '}
            <Typography component="span" fontSize={'0.75em'}>
              / {original.stockMinimo}
            </Typography>
          </Typography>
        ),
      },
      {
        accessorKey: 'categoria',
        header: 'Categoría',
        size: 75,
        filterVariant: 'multi-select',
        filterSelectOptions: allCategories,
        Cell: ({ cell }) => (
          <Chip variant="outlined" size="small" label={getCategoryLabel(cell.getValue<Categoria>())} />
        ),
      },
      {
        accessorKey: 'talles',
        header: 'Talles',
        size: 50,
        enableColumnFilter: false,
        enableSorting: false,
        filterSelectOptions: allSizes,
        Cell: ({ cell }) => (
          <>
            {cell.getValue<Talle[]>()?.map((talle) => (
              <Chip key={talle} label={talle} size="small" style={{ margin: '2px' }} />
            ))}
          </>
        ),
      },
    ],
    []
  );

  return (
    <Layout
      id={NavPage.PRODUCTS}
      header="Gestión de productos"
      metadata={{ title: 'Productos' }}
      error={error || deleteModal.error}
    >
      <DeleteProductModal handler={deleteModal} />
      <Divider sx={{ pt: 2, pb: 4 }}>
        <Chip
          label={isLoading ? 'Cargando...' : `${length} productos ${alerts ? ` ｜ ${alerts} con bajo stock` : ''}`}
          size="small"
          color={isLoading ? 'primary' : alerts ? 'error' : 'success'}
        />
      </Divider>
      <SuperTable
        data={data}
        isLoading={isLoading}
        actions={actions as unknown as ISuperTableAction<MRT_RowData>[]}
        columns={columns as unknown as MRT_ColumnDef<MRT_RowData, unknown>[]}
        initialState={{
          columnVisibility: {
            idProducto: false,
            talles: false,
          },
        }}
      />
      <SpeedDial
        ariaLabel="Acciones generales"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          p: { xs: 0, sm: 2, lg: 4 },
        }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction onClick={newProduct} key={'plus-one'} icon={<PlusOne />} tooltipTitle={'Crear nuevo'} />
      </SpeedDial>
    </Layout>
  );
}
