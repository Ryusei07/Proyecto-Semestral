// Reemplaza el componente Debug con esta versión:
const Debug = () => {
  try {
    const { products, featuredProducts } = require('./data/products');
    console.log('Productos cargados correctamente:', products.length);
  } catch (error) {
    console.error('ERROR cargando productos:', error);
  }
  return null;
};