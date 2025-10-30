export const products = [
  {
    id: 'goku-001',
    name: 'Goku',
    description: 'Figura de Dragon Ball Z',
    price: 39.000,
    image: 'https://phantom.pe/media/catalog/product/cache/c58c05327f55128aefac5642661cf3d1/4/9/4983164880748.jpg',
    category: 'dragon-ball'
  },
  {
    id: 'naruto-002',
    name: 'Naruto Uzumaki - Modo sabio',
    description: 'Figura de Naruto Shippuden',
    price: 54.000,
    image: 'https://manga-imperial.fr/cdn/shop/files/S8f18342d19c743e6a276b7fe91692863B_1600x.webp?v=1707138238',
    category: 'naruto'
  },
  {
    id: 'luffy-003',
    name: 'Monkey D. Luffy',
    description: 'Figura de One Piece',
    price: 43.000,
    image: 'https://i.pinimg.com/736x/c0/e2/37/c0e2378142e0424476f9458f6d02c250.jpg',
    category: 'one-piece'
  },
  {
    id: 'eren-004',
    name: 'Eren Jaeger',
    description: 'Figura de Attack on Titan',
    price: 149.000,
    image: 'https://cdn.shopify.com/s/files/1/0745/0243/9197/files/51FH3-JhwZL._AC_SL1000.jpg?v=1753999379',
    category: 'attack-on-titan'
  },
  {
    id: 'tanjiro-005',
    name: 'Tanjiro Kamado',
    description: 'Figura de Demon Slayer',
    price: 150.000,
    image: 'https://i5.walmartimages.com/asr/b187ec64-09c0-4a85-91a9-1e55f73efb4a.f82370511a6ca17fca0fa0aec5155101.jpeg',
    category: 'demon-slayer'
  },
  {
    id: 'toga-006',
    name: 'Himiko Toga',
    description: 'Figura de My Hero Academia',
    price: 199.000,
    image: 'https://tienda.richirocko.com/wp-content/uploads/2024/12/FIGURE-178695_11.jpg',
    category: 'my-hero-academia'
  },
  {
    id: 'hutao-007',
    name: 'Hu Tao',
    description: 'Figura de Genshin Impact',
    price: 249.000,
    image: 'https://toysonejapan.com/cdn/shop/files/s-l1600_9_03ce6861-89f7-478d-b0e3-61f8f5663780_800x534.webp?v=1736514979',
    category: 'genshin-impact'
  },
  {
    id: 'satoru-008',
    name: 'Gojo Satoru',
    description: 'Figura de Jujutsu Kaisen',
    price: 29.000,
    image: 'https://m.media-amazon.com/images/I/41ePgi+Cx2S._AC_SL1002_.jpg',
    category: 'jujutsu-kaisen'
  },
  {
    id: 'alisa-009',
    name: 'Alisa Mikhailovna Kujou',
    description: 'Figura de Tokidoki Bosotto Russia-go de Dereru Tonari no Alya-san',
    price: 50.000,
    image: 'https://korasama.b-cdn.net/wp-content/uploads/2024/09/4582733440156-4-500x500.jpg',
    category: 'romance'
  },
  {
    id: 'allmight-010',
    name: 'All Might',
    description: 'Figura de My Hero Academia',
    price: 15.000,
    image: 'https://i5.walmartimages.cl/asr/8f2bbbf5-92b3-4b37-8294-e89f067ba26c.59ff214d510bb6be35fd28dd1792e3cc.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
    category: 'my-hero-academia'
  }
];

// Para la página de inicio, mostramos 4 productos destacados
export const featuredProducts = products.slice(0, 4);