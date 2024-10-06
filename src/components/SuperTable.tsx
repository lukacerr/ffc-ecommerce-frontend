import { MenuItem, ListItemIcon, TypographyProps, Typography } from '@mui/material';
import {
  MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
  MRT_RowData,
  MRT_TableOptions,
  MRT_Row,
  MRT_TableInstance,
  MRT_TableState,
} from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { memo } from 'react';

export interface ISuperTableAction<T extends MRT_RowData> {
  title: string;
  titleProps?: TypographyProps;
  icon?: React.ReactNode;
  handle: (p: { row: MRT_Row<T>; staticRowIndex?: number; table: MRT_TableInstance<T> }) => void;
}

export interface ISuperTableProps<T extends MRT_RowData> {
  data: T[] | undefined;
  columns: MRT_ColumnDef<T>[];
  table?: Partial<MRT_TableOptions<T>>;
  isLoading: boolean;
  initialState?: Partial<MRT_TableState<T>>;
  externalState?: Partial<MRT_TableState<T>>;
  actions?: ISuperTableAction<T>[];
}

export default memo(function SuperTable<T extends MRT_RowData>({
  data = [],
  table,
  columns,
  isLoading = false,
  actions = [],
  initialState,
  externalState,
}: ISuperTableProps<T>) {
  const t = useMaterialReactTable({
    localization: MRT_Localization_ES,
    columns: columns,
    state: {
      showSkeletons: isLoading,
      isLoading: isLoading,
      ...externalState,
    },
    data,
    enableFacetedValues: true,
    enableRowVirtualization: true,
    enableColumnFilterModes: true,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableRowActions: !!actions.length,
    enableRowSelection: false,
    enableHiding: true,
    paginationDisplayMode: 'pages',
    muiTableHeadCellProps: {
      sx: {
        '& .MuiFormHelperText-root': {
          display: 'none',
        },
      },
    },
    muiTableContainerProps: {
      sx: {
        maxHeight: {
          xs: 'calc(100vh - 240px - 64px - 6em)',
          sm: 'calc(100vh - 240px - 64px - 4em)',
          md: 'calc(100vh - 240px - 64px)',
        },
        maxWidth: 'calc(100vw - 16px - 16px - 2em)',
      },
    },
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
      columnPinning: {
        right: ['mrt-row-actions'],
      },
      ...initialState,
    },
    renderRowActionMenuItems: !actions.length
      ? undefined
      : (rowControl) =>
          actions.map((ac) => (
            <MenuItem key={ac.title} onClick={() => [ac.handle(rowControl), rowControl.closeMenu()]}>
              {ac.icon && <ListItemIcon>{ac.icon}</ListItemIcon>}
              <Typography {...ac.titleProps}>{ac.title}</Typography>
            </MenuItem>
          )),
    ...table,
  });

  return <MaterialReactTable table={t} />;
});
