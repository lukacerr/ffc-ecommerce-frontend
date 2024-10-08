import Compra from '@/types/compra.interface';

export default async function ComprasGet(): Promise<Compra[]> {
  // FIXME: return (await axios.get('/ventas')).data;
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return [
    {
      idCompra: 0,
      nombreUsuario: 'David Green',
      fechaOrden: new Date('2024-01-12'),
      montoTotal: 1200.25,
      cantidadDeUnidades: 3,
      idProducto: 21,
    },
    {
      idCompra: 1,
      nombreUsuario: 'Emily Davis',
      fechaOrden: new Date('2023-11-14'),
      montoTotal: 350.75,
      cantidadDeUnidades: 1,
      idProducto: 7,
    },
    {
      idCompra: 2,
      nombreUsuario: 'Michael Smith',
      fechaOrden: new Date('2023-09-05'),
      montoTotal: 430.0,
      cantidadDeUnidades: 2,
      idProducto: 3,
    },
    {
      idCompra: 3,
      nombreUsuario: 'Jessica Johnson',
      fechaOrden: new Date('2023-10-09'),
      montoTotal: 790.8,
      cantidadDeUnidades: 4,
      idProducto: 15,
    },
    {
      idCompra: 4,
      nombreUsuario: 'William Taylor',
      fechaOrden: new Date('2023-12-20'),
      montoTotal: 1500.0,
      cantidadDeUnidades: 5,
      idProducto: 5,
    },
    {
      idCompra: 5,
      nombreUsuario: 'Sarah Wilson',
      fechaOrden: new Date('2023-11-21'),
      montoTotal: 900.9,
      cantidadDeUnidades: 3,
      idProducto: 9,
    },
    {
      idCompra: 6,
      nombreUsuario: 'Daniel Lee',
      fechaOrden: new Date('2023-08-18'),
      montoTotal: 1250.25,
      cantidadDeUnidades: 2,
      idProducto: 14,
    },
    {
      idCompra: 7,
      nombreUsuario: 'Linda Harris',
      fechaOrden: new Date('2023-09-29'),
      montoTotal: 450.75,
      cantidadDeUnidades: 1,
      idProducto: 22,
    },
    {
      idCompra: 8,
      nombreUsuario: 'James Clark',
      fechaOrden: new Date('2023-12-11'),
      montoTotal: 670.0,
      cantidadDeUnidades: 2,
      idProducto: 17,
    },
    {
      idCompra: 9,
      nombreUsuario: 'Karen Martinez',
      fechaOrden: new Date('2023-10-01'),
      montoTotal: 340.55,
      cantidadDeUnidades: 1,
      idProducto: 6,
    },
    {
      idCompra: 10,
      nombreUsuario: 'Barbara White',
      fechaOrden: new Date('2023-11-16'),
      montoTotal: 250.0,
      cantidadDeUnidades: 1,
      idProducto: 2,
    },
    {
      idCompra: 11,
      nombreUsuario: 'Robert Thompson',
      fechaOrden: new Date('2023-09-14'),
      montoTotal: 450.5,
      cantidadDeUnidades: 1,
      idProducto: 8,
    },
    {
      idCompra: 12,
      nombreUsuario: 'Jessica Young',
      fechaOrden: new Date('2023-12-15'),
      montoTotal: 630.99,
      cantidadDeUnidades: 4,
      idProducto: 4,
    },
    {
      idCompra: 13,
      nombreUsuario: 'Daniel King',
      fechaOrden: new Date('2023-10-03'),
      montoTotal: 800.0,
      cantidadDeUnidades: 1,
      idProducto: 20,
    },
    {
      idCompra: 14,
      nombreUsuario: 'Andrew Hall',
      fechaOrden: new Date('2023-08-22'),
      montoTotal: 1250.0,
      cantidadDeUnidades: 2,
      idProducto: 19,
    },
    {
      idCompra: 15,
      nombreUsuario: 'Olivia Johnson',
      fechaOrden: new Date('2023-11-19'),
      montoTotal: 300.0,
      cantidadDeUnidades: 1,
      idProducto: 11,
    },
    {
      idCompra: 16,
      nombreUsuario: 'Patricia Williams',
      fechaOrden: new Date('2023-09-26'),
      montoTotal: 980.7,
      cantidadDeUnidades: 5,
      idProducto: 12,
    },
    {
      idCompra: 17,
      nombreUsuario: 'Steven Walker',
      fechaOrden: new Date('2023-08-19'),
      montoTotal: 420.3,
      cantidadDeUnidades: 2,
      idProducto: 1,
    },
    {
      idCompra: 18,
      nombreUsuario: 'Nancy Rodriguez',
      fechaOrden: new Date('2023-10-15'),
      montoTotal: 240.0,
      cantidadDeUnidades: 1,
      idProducto: 18,
    },
    {
      idCompra: 19,
      nombreUsuario: 'Megan Allen',
      fechaOrden: new Date('2023-11-01'),
      montoTotal: 765.4,
      cantidadDeUnidades: 3,
      idProducto: 16,
    },
    {
      idCompra: 20,
      nombreUsuario: 'Joshua Martinez',
      fechaOrden: new Date('2023-09-17'),
      montoTotal: 800.3,
      cantidadDeUnidades: 4,
      idProducto: 13,
    },
    {
      idCompra: 21,
      nombreUsuario: 'Jessica Scott',
      fechaOrden: new Date('2023-12-12'),
      montoTotal: 560.0,
      cantidadDeUnidades: 1,
      idProducto: 23,
    },
    {
      idCompra: 22,
      nombreUsuario: 'Daniel White',
      fechaOrden: new Date('2023-08-20'),
      montoTotal: 300.25,
      cantidadDeUnidades: 2,
      idProducto: 10,
    },
    {
      idCompra: 23,
      nombreUsuario: 'Lisa Harris',
      fechaOrden: new Date('2023-10-07'),
      montoTotal: 1000.0,
      cantidadDeUnidades: 1,
      idProducto: 24,
    },
    {
      idCompra: 24,
      nombreUsuario: 'James Johnson',
      fechaOrden: new Date('2023-09-03'),
      montoTotal: 450.75,
      cantidadDeUnidades: 1,
      idProducto: 25,
    },
    {
      idCompra: 25,
      nombreUsuario: 'Karen Brown',
      fechaOrden: new Date('2023-12-18'),
      montoTotal: 270.4,
      cantidadDeUnidades: 3,
      idProducto: 15,
    },
    {
      idCompra: 26,
      nombreUsuario: 'Richard Lee',
      fechaOrden: new Date('2023-11-22'),
      montoTotal: 1300.3,
      cantidadDeUnidades: 1,
      idProducto: 14,
    },
    {
      idCompra: 27,
      nombreUsuario: 'David Wilson',
      fechaOrden: new Date('2023-10-25'),
      montoTotal: 600.0,
      cantidadDeUnidades: 2,
      idProducto: 12,
    },
    {
      idCompra: 28,
      nombreUsuario: 'Michelle Scott',
      fechaOrden: new Date('2023-08-17'),
      montoTotal: 100.9,
      cantidadDeUnidades: 1,
      idProducto: 2,
    },
    {
      idCompra: 29,
      nombreUsuario: 'Nancy Carter',
      fechaOrden: new Date('2023-09-23'),
      montoTotal: 430.2,
      cantidadDeUnidades: 3,
      idProducto: 19,
    },
    {
      idCompra: 30,
      nombreUsuario: 'James Harris',
      fechaOrden: new Date('2023-10-10'),
      montoTotal: 210.4,
      cantidadDeUnidades: 1,
      idProducto: 8,
    },
    {
      idCompra: 31,
      nombreUsuario: 'Susan Taylor',
      fechaOrden: new Date('2023-11-13'),
      montoTotal: 490.0,
      cantidadDeUnidades: 1,
      idProducto: 3,
    },
    {
      idCompra: 32,
      nombreUsuario: 'Robert Brown',
      fechaOrden: new Date('2023-09-30'),
      montoTotal: 675.6,
      cantidadDeUnidades: 4,
      idProducto: 11,
    },
    {
      idCompra: 33,
      nombreUsuario: 'Olivia White',
      fechaOrden: new Date('2023-10-20'),
      montoTotal: 800.2,
      cantidadDeUnidades: 2,
      idProducto: 20,
    },
    {
      idCompra: 34,
      nombreUsuario: 'David Allen',
      fechaOrden: new Date('2023-11-15'),
      montoTotal: 360.0,
      cantidadDeUnidades: 1,
      idProducto: 24,
    },
    {
      idCompra: 35,
      nombreUsuario: 'Barbara Hall',
      fechaOrden: new Date('2023-08-24'),
      montoTotal: 450.0,
      cantidadDeUnidades: 3,
      idProducto: 17,
    },
    {
      idCompra: 36,
      nombreUsuario: 'Daniel Garcia',
      fechaOrden: new Date('2023-12-02'),
      montoTotal: 530.1,
      cantidadDeUnidades: 1,
      idProducto: 5,
    },
    {
      idCompra: 37,
      nombreUsuario: 'Emily Young',
      fechaOrden: new Date('2023-11-19'),
      montoTotal: 990.25,
      cantidadDeUnidades: 2,
      idProducto: 22,
    },
    {
      idCompra: 38,
      nombreUsuario: 'Jessica Wright',
      fechaOrden: new Date('2023-10-26'),
      montoTotal: 310.8,
      cantidadDeUnidades: 1,
      idProducto: 9,
    },
    {
      idCompra: 39,
      nombreUsuario: 'James Martin',
      fechaOrden: new Date('2023-09-04'),
      montoTotal: 800.0,
      cantidadDeUnidades: 3,
      idProducto: 4,
    },
    {
      idCompra: 40,
      nombreUsuario: 'Laura King',
      fechaOrden: new Date('2023-12-13'),
      montoTotal: 1234.5,
      cantidadDeUnidades: 2,
      idProducto: 6,
    },
    {
      idCompra: 41,
      nombreUsuario: 'William Robinson',
      fechaOrden: new Date('2023-11-28'),
      montoTotal: 560.4,
      cantidadDeUnidades: 3,
      idProducto: 18,
    },
    {
      idCompra: 42,
      nombreUsuario: 'Barbara Scott',
      fechaOrden: new Date('2023-10-02'),
      montoTotal: 420.1,
      cantidadDeUnidades: 1,
      idProducto: 16,
    },
    {
      idCompra: 43,
      nombreUsuario: 'Michael Lewis',
      fechaOrden: new Date('2023-09-26'),
      montoTotal: 780.0,
      cantidadDeUnidades: 4,
      idProducto: 10,
    },
    {
      idCompra: 44,
      nombreUsuario: 'Emily Hill',
      fechaOrden: new Date('2023-11-09'),
      montoTotal: 250.5,
      cantidadDeUnidades: 2,
      idProducto: 15,
    },
    {
      idCompra: 45,
      nombreUsuario: 'Jason Walker',
      fechaOrden: new Date('2023-10-21'),
      montoTotal: 1800.75,
      cantidadDeUnidades: 5,
      idProducto: 12,
    },
    {
      idCompra: 46,
      nombreUsuario: 'Laura Harris',
      fechaOrden: new Date('2023-08-15'),
      montoTotal: 430.0,
      cantidadDeUnidades: 1,
      idProducto: 19,
    },
    {
      idCompra: 47,
      nombreUsuario: 'Sarah Martin',
      fechaOrden: new Date('2023-09-12'),
      montoTotal: 300.3,
      cantidadDeUnidades: 2,
      idProducto: 11,
    },
    {
      idCompra: 48,
      nombreUsuario: 'Mark Lee',
      fechaOrden: new Date('2023-10-17'),
      montoTotal: 470.25,
      cantidadDeUnidades: 1,
      idProducto: 1,
    },
    {
      idCompra: 49,
      nombreUsuario: 'Rachel Young',
      fechaOrden: new Date('2023-12-24'),
      montoTotal: 900.0,
      cantidadDeUnidades: 2,
      idProducto: 8,
    },
  ];
}
