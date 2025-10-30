-- Insertar Categorías 
INSERT INTO categorias (nombre) VALUES ('Dragon Ball') ON DUPLICATE KEY UPDATE nombre=nombre; -- Categoria id 1
INSERT INTO categorias (nombre) VALUES ('One Piece') ON DUPLICATE KEY UPDATE nombre=nombre; -- Categoria id 2
INSERT INTO categorias (nombre) VALUES ('Naruto Shippuden') ON DUPLICATE KEY UPDATE nombre=nombre; -- Categoria id 3
INSERT INTO categorias (nombre) VALUES ('Jujutsu Kaisen') ON DUPLICATE KEY UPDATE nombre=nombre;  -- Categoria id 4
INSERT INTO categorias (nombre) VALUES ('Genshin Impact') ON DUPLICATE KEY UPDATE nombre=nombre; -- Categoria id 5
INSERT INTO categorias (nombre) VALUES ('My Hero Academia') ON DUPLICATE KEY UPDATE nombre=nombre; -- Categoria id 6
INSERT INTO categorias (nombre) VALUES ('Attack on Titan') ON DUPLICATE KEY UPDATE nombre=nombre; -- Categoria id 7


-- Insertar Usuario Administrador
-- Usuario Administrador Diego
-- La contraseña es "diegoadmin123" para el administrador diego Admin con el correo diegoadmin@shibuyastore.cl(encriptada con BCrypt)
INSERT INTO usuarios (nombre, email, contrasena, rol, estado, fecha_creacion) 
VALUES ('Diego Admin', 'diegoadmin@shibuyastore.cl', '$2a$12$vYsaq7aQmFVLoI2O6YCHk.gFa0l2uzl7urNjzv1HcmOR9ZCtEZDFy', 'super-admin', 'activo', NOW())
ON DUPLICATE KEY UPDATE email=email;

-- Usuario Administrador Gabriel
-- La contraseña para Gabriel es: gabrieladmin123
INSERT INTO usuarios (nombre, email, contrasena, rol, estado, fecha_creacion) 
VALUES ('Gabriel Admin', 'gabrieladmin@shibuyastore.cl', '$2a$12$VLE.dX.HOqudiXyDNTmWt.7HxiscdWVFimJQqbXhuFH5.ao9CCjGS', 'super-admin', 'activo', NOW())
ON DUPLICATE KEY UPDATE email=email;

-- Insertar Productos (Mínimo 15)
INSERT INTO productos (nombre, descripcion, precio, stock, imagen, estado, fecha_creacion, categoria_id) VALUES 
('Goku SSJ 1', 'Figura del Anime Dragon Ball', 59990, 10, '/uploads/gokussj1.jpg', 'activo', NOW(), 1),
('Monkey D. Luffy', 'Figura del Anime One Piece', 79990, 5, '/uploads/luffy.jpg', 'activo', NOW(), 2),
('Naruto Modo Sabio', 'Figura del Anime Naruto Shippuden', 69990, 8, '/uploads/naruto.jpg', 'activo', NOW(), 3),
('Gojo Satoru', 'Figura del Anime Jujutsu Kaisen', 49990, 15, '/uploads/satoru.jpg', 'activo', NOW(), 4),
('Raiden Shogun', 'Figura del Videojuego Genshin Impact', 89990, 3, '/uploads/raiden.jpg', 'activo', NOW(), 5),
('Vegeta SSJ 1', 'Figura del Anime Dragon Ball', 55000, 12,'/uploads/vegeta.jpg', 'activo', NOW(), 1),
('Zoro Roronoa', 'Figura del Anime One Piece', 65000, 7,'/uploads/zoro.jpg', 'activo', NOW(), 2),
('Itachi Uchiha', 'Figura del Anime Naruto Shippuden', 62000, 9,'/uploads/itachi.jpg', 'activo', NOW(), 3),
('Yuji Itadori', 'Figura del Anime Jujutsu Kaisen', 45000, 20,'/uploads/yuji.jpg', 'activo', NOW(), 4),
('Zhongli', 'Figura del Videojuego Genshin Impact', 89000, 4,'/uploads/zhongli.jpg', 'activo', NOW(), 5),
('Gohan SSJ2', 'Figura del Anime Dragon Ball', 75000, 6,'/uploads/gohan.jpg', 'activo', NOW(), 1),
('Sanji', 'Figura del Anime One Piece', 60000, 11,'/uploads/sanji.jpg', 'activo', NOW(), 2),
('Himiko Toga', 'Figura del Anime My Hero Academia', 58000, 10,'/uploads/toga.jpg', 'activo', NOW(), 6),
('Eren Jaeger', 'Figura del Anime Attack on Titan', 47000, 14,'/uploads/eren.jpg', 'activo', NOW(), 7),
('Yae Miko', 'Figura del Videojuego Genshin Impact', 85000, 5,'/uploads/yaemiko.jpg', 'activo', NOW(), 5);