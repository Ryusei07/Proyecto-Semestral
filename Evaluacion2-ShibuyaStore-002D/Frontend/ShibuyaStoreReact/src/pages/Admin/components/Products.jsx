import './Products.css';

const Products = () => {
  // TODOS LOS 10 PRODUCTOS
  const products = [
    {
      id: 'PROD-001',
      name: 'Goku',
      price: 39,
      stock: 15,
      category: 'Dragon Ball Z',
      image: 'https://phantom.pe/media/catalog/product/cache/c58c05327f55128aefac5642661cf3d1/4/9/4983164880748.jpg'
    },
    {
      id: 'PROD-002',
      name: 'Naruto Uzumaki - Modo sabio',
      price: 54,
      stock: 3,
      category: 'Naruto Shippuden',
      image: 'https://manga-imperial.fr/cdn/shop/files/S8f18342d19c743e6a276b7fe91692863B_1600x.webp?v=1707138238'
    },
    {
      id: 'PROD-003',
      name: 'Monkey D. Luffy',
      price: 43,
      stock: 22,
      category: 'One Piece',
      image: 'https://i.pinimg.com/736x/c0/e2/37/c0e2378142e0424476f9458f6d02c250.jpg'
    },
    {
      id: 'PROD-004',
      name: 'Eren Jaeger',
      price: 149,
      stock: 14,
      category: 'Attack on Titan',
      image: 'https://cdn.shopify.com/s/files/1/0745/0243/9197/files/51FH3-JhwZL._AC_SL1000.jpg?v=1753999379'
    },
    {
      id: 'PROD-005',
      name: 'Tanjiro Kamado',
      price: 150,
      stock: 15,
      category: 'Demon Slayer',
      image: 'https://i5.walmartimages.com/asr/b187ec64-09c0-4a85-91a9-1e55f73efb4a.f82370511a6ca17fca0fa0aec5155101.jpeg'
    },
    {
      id: 'PROD-006',
      name: 'Himiko Toga',
      price: 199,
      stock: 9,
      category: 'My Hero Academia',
      image: 'https://tienda.richirocko.com/wp-content/uploads/2024/12/FIGURE-178695_11.jpg'
    },
    {
      id: 'PROD-007',
      name: 'Hu Tao',
      price: 249,
      stock: 2,
      category: 'Genshin Impact',
      image: 'https://toysonejapan.com/cdn/shop/files/s-l1600_9_03ce6861-89f7-478d-b0e3-61f8f5663780_800x534.webp?v=1736514979'
    },
    {
      id: 'PROD-008',
      name: 'Gojo Satoru',
      price: 29,
      stock: 43,
      category: 'Jujutsu Kaisen',
      image: 'https://m.media-amazon.com/images/I/41ePgi+Cx2S._AC_SL1002_.jpg'
    },
    {
      id: 'PROD-009',
      name: 'Alisa Mikhailovna Kujou',
      price: 50,
      stock: 0,
      category: 'Romance',
      image: 'https://korasama.b-cdn.net/wp-content/uploads/2024/09/4582733440156-4-500x500.jpg'
    },
    {
      id: 'PROD-010',
      name: 'All Might',
      price: 15,
      stock: 0,
      category: 'My Hero Academia',
      image: 'https://i5.walmartimages.cl/asr/8f2bbbf5-92b3-4b37-8294-e89f067ba26c.59ff214d510bb6be35fd28dd1792e3cc.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF'
    }
  ];

  console.log('🔄 Products component loaded with', products.length, 'products');

  const handleEdit = (productId) => {
    alert(`Editando producto: ${productId}`);
  };

  const handleDelete = (productId) => {
    if (window.confirm(`¿Estás seguro de eliminar el producto ${productId}?`)) {
      alert(`Producto ${productId} eliminado`);
    }
  };

  return (
    <div className="products-management">
      <div className="page-header">
        <h2>Gestión de Productos</h2>
        <button className="btn btn-primary">
          <i className="fas fa-plus"></i> Nuevo Producto
        </button>
      </div>
      
      <div className="table-info">
        <p>Mostrando <strong>{products.length}</strong> productos en total</p>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="table-img" 
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/50x50?text=Imagen+No+Disponible';
                    }}
                  />
                </td>
                <td><strong>{product.name}</strong></td>
                <td>${product.price}</td>
                <td>
                  <span className={
                    product.stock === 0 ? 'stock-out' : 
                    product.stock <= 5 ? 'stock-warning' : 'stock-ok'
                  }>
                    {product.stock} unidades
                  </span>
                </td>
                <td>{product.category}</td>
                <td>
                  <button 
                    className="btn-icon"
                    onClick={() => handleEdit(product.id)}
                    title="Editar"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    className="btn-icon btn-danger"
                    onClick={() => handleDelete(product.id)}
                    title="Eliminar"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;