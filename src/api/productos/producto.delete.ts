export default async function ProductoDelete(id: number) {
  // FIXME: return (await axios.delete(`/productos/${id}`)).data;
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { msj: 'OK', id };
}
