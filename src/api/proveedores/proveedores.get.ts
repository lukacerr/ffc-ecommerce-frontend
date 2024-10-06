export default async function ProveedoresGet() {
  // FIXME: return (await axios.get('/proveedores')).data;
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return [
    {
      idProveedor: 0,
      nombre: 'Proveedores SA',
      CUIT: '20-12345678-9',
    },
    {
      idProveedor: 1,
      nombre: 'Distribuciones El Sol',
      CUIT: '27-98765432-1',
    },
    {
      idProveedor: 2,
      nombre: 'Comercializadora XYZ',
      CUIT: '23-34567890-7',
    },
    {
      idProveedor: 3,
      nombre: 'Alimentos Gourmet',
      CUIT: '30-45678901-6',
    },
    {
      idProveedor: 4,
      nombre: 'Electrodomésticos ABC',
      CUIT: '20-56789012-5',
    },
    {
      idProveedor: 5,
      nombre: 'Tecnología Avanzada',
      CUIT: '27-67890123-4',
    },
    {
      idProveedor: 6,
      nombre: 'Ropa y Moda',
      CUIT: '23-78901234-3',
    },
    {
      idProveedor: 7,
      nombre: 'Materiales de Construcción',
      CUIT: '30-89012345-2',
    },
    {
      idProveedor: 8,
      nombre: 'Papelería y Oficina',
      CUIT: '20-90123456-1',
    },
    {
      idProveedor: 9,
      nombre: 'Productos de Limpieza',
      CUIT: '27-01234567-0',
    },
    {
      idProveedor: 10,
      nombre: 'Ferretería El Martillo',
      CUIT: '23-12345678-9',
    },
    {
      idProveedor: 11,
      nombre: 'Florería Primavera',
      CUIT: '30-23456789-8',
    },
    {
      idProveedor: 12,
      nombre: 'Juguetes Fantasía',
      CUIT: '20-34567890-7',
    },
    {
      idProveedor: 13,
      nombre: 'Muebles y Decoración',
      CUIT: '27-45678901-6',
    },
    {
      idProveedor: 14,
      nombre: 'Servicios de Catering',
      CUIT: '23-56789012-5',
    },
  ];
}
