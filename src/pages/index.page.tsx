import Layout from '@/components/layout';
import { NavPage } from '@/components/layout/constants';
import { BarChart, LineChart, PieChart, ScatterChart } from '@mui/x-charts';
import { useQuery } from '@tanstack/react-query';
import VentasGet from '@/api/dashboard/ventas.get';
import ComprasGet from '@/api/dashboard/compras.get';
import DashboardUtils from '@/utils/dashboard.utils';
import { useMemo, useState } from 'react';
import theme from '@/theme';
import { toArsString } from '@/utils/toString.utils';
import Big from 'big.js';
import dayjs from 'dayjs';
import { List, ListItem, ListItemText, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import DateSlider from '@/components/DateSlider';
import { nToDayString } from '@/utils/dayjs.utils';

export default function IndexPage() {
  const { isLoading, data, error } = useQuery({
    queryKey: [VentasGet.name, ComprasGet.name],
    queryFn: () => Promise.all([VentasGet(), ComprasGet()]),
  });

  const [filters, setFilters] = useState([dayjs().subtract(1, 'year').valueOf(), dayjs().valueOf()]);

  const dashboard = useMemo(
    () =>
      data ? new DashboardUtils(...data, { from: dayjs(filters[0]), to: dayjs(filters[1]) }) : new DashboardUtils(),
    [data, filters]
  );

  const calculations = useMemo(
    () => ({
      compraAmountXdates: dashboard.dataXdateReducer('compra', (pv, v) => pv.add(v.amount), Big(0)),
      ventaAmountXdates: dashboard.dataXdateReducer('venta', (pv, v) => pv.add(v.amount), Big(0)),
      diferenciaXdates: dashboard.dataXdateReducer(
        'full',
        (pv, v) => pv.add(v.amount.times(v.type === 'compra' ? -1 : 1)),
        Big(0)
      ),
      totalAmountCompra: dashboard.dataReducer('compra', (pv, v) => pv.add(v.amount), Big(0)),
      totalAmountVenta: dashboard.dataReducer('venta', (pv, v) => pv.add(v.amount), Big(0)),
      ventaAmountXweeks: dashboard.dataXweekReducer('venta', (pv, v) => pv.add(v.amount), Big(0)),
      compraAmountXweeks: dashboard.dataXweekReducer('compra', (pv, v) => pv.add(v.amount), Big(0)),
      ventaAmountXusers: dashboard.dataXuserReducer(
        'venta',
        (pv, v) => pv.add(v.amount),
        Big(0),
        (a, b) => b.minus(a).toNumber()
      ),
    }),
    [dashboard]
  );

  return (
    <Layout
      id={NavPage.DASHBOARD}
      header="Balances y analítica"
      metadata={{ title: 'Analítica' }}
      loading={isLoading}
      error={error}
    >
      <Paper elevation={4} sx={{ px: 4, py: 2, mt: 2 }}>
        <DateSlider value={filters} setValue={setFilters} minDate={dashboard.minDate} maxDate={dashboard.maxDate} />
      </Paper>

      <Paper variant="outlined" sx={{ p: 2, m: 2 }}>
        <Grid container spacing={2} display="flex" justifyContent="center" alignItems="center">
          <Grid size={{ xs: 12, md: 8 }}>
            <LineChart
              grid={{ vertical: true, horizontal: true }}
              xAxis={[
                {
                  data: dashboard.uniqueDates,
                  valueFormatter: (date) => dayjs(date).format('DD/MM/YYYY'),
                },
              ]}
              series={[
                {
                  label: 'Compras',
                  color: theme.palette.secondary.main,
                  data: DashboardUtils.BigToNumberArray(calculations.compraAmountXdates),
                  valueFormatter: (v) => (v ? toArsString(v) : '-'),
                  area: true,
                },
                {
                  label: 'Ventas',
                  color: theme.palette.primary.main,
                  data: DashboardUtils.BigToNumberArray(calculations.ventaAmountXdates),
                  valueFormatter: (v) => (v ? toArsString(v) : '-'),
                  area: true,
                },
              ]}
              height={300}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <PieChart
              colors={[theme.palette.primary.main, theme.palette.secondary.main]}
              series={[
                {
                  data: [
                    { id: 'venta', label: 'Ventas', value: calculations.totalAmountVenta.toNumber() },
                    { id: 'compra', label: 'Compras', value: calculations.totalAmountCompra.toNumber() },
                  ],
                  innerRadius: 24,
                  paddingAngle: 6,
                  cornerRadius: 6,
                  arcLabel: (item) =>
                    `${Big(item.value)
                      .div(calculations.totalAmountVenta.plus(calculations.totalAmountCompra))
                      .times(100)
                      .toFixed(2)}%`,
                  arcLabelMinAngle: 35,
                  highlightScope: { fade: 'global', highlight: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                  valueFormatter: (v) => toArsString(v.value),
                },
              ]}
              height={200}
            />
          </Grid>

          <Grid size={12}>
            <BarChart
              xAxis={[
                {
                  scaleType: 'band',
                  data: dashboard.uniqueDates,
                  valueFormatter: (date) => dayjs(date).format('DD/MM/YYYY'),
                },
              ]}
              series={[
                {
                  data: DashboardUtils.BigToNumberArray(calculations.ventaAmountXdates),
                  color: theme.palette.primary.main,
                  label: 'Ventas',
                  valueFormatter: (v) => (v ? toArsString(v) : '-'),
                },
                {
                  data: DashboardUtils.BigToNumberArray(calculations.compraAmountXdates),
                  color: theme.palette.secondary.main,
                  label: 'Compras',
                  valueFormatter: (v) => (v ? toArsString(v) : '-'),
                },
                {
                  data: DashboardUtils.BigToNumberArray(calculations.diferenciaXdates),
                  color: theme.palette.success.main,
                  label: 'Diferencia',
                  valueFormatter: (v) => (v ? toArsString(v) : '-'),
                },
              ]}
              grid={{ vertical: true }}
              height={400}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <List dense={true} sx={{ listStyle: 'decimal', pl: 4, height: 300, overflowBlock: 'scroll' }}>
              {dashboard.uniqueBuyers.slice(0, 100).map((u, i) => (
                <ListItem key={u} sx={{ display: 'list-item' }}>
                  <ListItemText
                    primary={u}
                    secondary={toArsString(calculations.ventaAmountXusers[i])}
                    secondaryTypographyProps={{ color: 'success' }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <BarChart
              yAxis={[
                {
                  scaleType: 'band',
                  data: [0, 1, 2, 3, 4, 5, 6],
                  valueFormatter: nToDayString,
                },
              ]}
              series={[
                {
                  data: DashboardUtils.BigToNumberArray(calculations.ventaAmountXweeks),
                  color: theme.palette.primary.main,
                  label: 'Ventas',
                  valueFormatter: (v) => (v ? toArsString(v) : '-'),
                },
                {
                  data: DashboardUtils.BigToNumberArray(calculations.compraAmountXweeks),
                  color: theme.palette.secondary.main,
                  label: 'Compras',
                  valueFormatter: (v) => (v ? toArsString(v) : '-'),
                },
              ]}
              grid={{ horizontal: true }}
              layout="horizontal"
              height={300}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <ScatterChart
              height={300}
              series={[
                {
                  data: dashboard.dataOf('venta').map((v) => ({ id: v.id, x: v.quantity, y: v.amount.toNumber() })),
                  label: 'Ventas',
                  id: 'ventas',
                  color: theme.palette.primary.main,
                  valueFormatter: ({ x, y, id }) =>
                    `(${dashboard.id(id)?.date.format('DD/MM/YYYY')}) ${x} productos por ${toArsString(y)}`,
                },
                {
                  data: dashboard.dataOf('compra').map((v) => ({ id: v.id, x: v.quantity, y: v.amount.toNumber() })),
                  label: 'Compras',
                  id: 'compras',
                  color: theme.palette.secondary.main,
                  valueFormatter: ({ x, y, id }) =>
                    `(${dashboard.id(id)?.date.format('DD/MM/YYYY')}) ${x} productos por ${toArsString(y)}`,
                },
              ]}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* 
      <Grid size={{ xs: 12, md: 4 }}>
        <Gauge
          height={200}
          value={60}
          cornerRadius="50%"
          sx={(theme) => ({
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 40,
            },
            [`& .${gaugeClasses.valueArc}`]: {
              fill: theme.palette.success.main,
            },
          })}
        />
      </Grid>
      */}
    </Layout>
  );
}
