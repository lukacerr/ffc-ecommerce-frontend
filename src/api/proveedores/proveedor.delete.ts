export default async function ProveedorDelete(id: number) {
  // FIXME: return (await axios.delete(`/proveedores/${id}`)).data;
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { msj: 'OK', id };
}
