export const deleteUndefinedProperties = (data: any) => {
  // Eliminar propiedades con valor `undefined`
  Object.keys(data).forEach((key) => {
    if (data[key] === undefined || data[key] === null) {
      delete data[key];
    }
  });

  return data;
};
