CREATE TABLE usuario (
    usuario_id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuario (nombre, contrasena, email) VALUES ('Usuario', 'password', 'usuario@deprueba.pr');

CREATE TABLE electrodomestico (
    electrodomestico_id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuario(usuario_id) ON DELETE CASCADE,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    marca VARCHAR(255),
    modelo VARCHAR(255),
    voltaje_nominal NUMERIC NOT NULL DEFAULT 220,
    amperaje_nominal NUMERIC NOT NULL,
    potencia_nominal NUMERIC NOT NULL,
    umbral_voltaje_min NUMERIC DEFAULT 198,
    umbral_voltaje_max NUMERIC DEFAULT 244,
    umbral_amperaje_min NUMERIC,
    umbral_amperaje_max NUMERIC,
    umbral_potencia_min NUMERIC,
    umbral_potencia_max NUMERIC,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE medicion_estado (
    medicion_estado_id SERIAL PRIMARY KEY,
    medicion_estado_nombre TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO medicion_estado (medicion_estado_nombre) VALUES 
    ('Consumo Alto'),
    ('Consumo Normal'),
    ('Consumo Bajo');

CREATE TABLE medicion (
    medicion_id SERIAL PRIMARY KEY,
    electrodomestico_id INT REFERENCES electrodomestico(electrodomestico_id),
    medicion_estado_id INT REFERENCES medicion_estado(medicion_estado_id),
    voltaje NUMERIC NOT NULL DEFAULT 220, 
    amperaje NUMERIC NOT NULL, 
    potencia NUMERIC NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tipo_anomalia (
    tipo_anomalia_id SERIAL PRIMARY KEY,
    tipo_anomalia_nombre TEXT NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tipo_anomalia (tipo_anomalia_nombre) VALUES 
    ('Amperaje Bajo'),
    ('Amperaje Alto'),
    ('Potencia Baja'),
    ('Potencia Alta');

CREATE TABLE medicion_anomalia (
    medicion_anomalia_id SERIAL PRIMARY KEY,
    medicion_anomalia_valor INTEGER NOT NULL,
    umbral_excedido INTEGER NOT NULL,
    medicion_id INT REFERENCES electrodomestico(electrodomestico_id),
    tipo_anomalia_id INT REFERENCES tipo_anomalia(tipo_anomalia_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE electrodomestico_info (
    electrodomestico_info_id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    voltaje_nominal NUMERIC NOT NULL DEFAULT 220,
    amperaje_nominal NUMERIC NOT NULL,
    potencia_nominal NUMERIC NOT NULL,
    umbral_voltaje_min NUMERIC NOT NULL DEFAULT 198,
    umbral_voltaje_max NUMERIC NOT NULL DEFAULT 244,
    umbral_amperaje_min NUMERIC,
    umbral_amperaje_max NUMERIC,
    umbral_potencia_min NUMERIC,
    umbral_potencia_max NUMERIC,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO electrodomestico_info(
    nombre,
    amperaje_nominal,
    potencia_nominal,
    umbral_amperaje_min,
    umbral_amperaje_max,
    umbral_potencia_min,
    umbral_potencia_max
) VALUES 
    ('Microondas', 5.5, 1200, 4.5, 7, 1000, 1500),
    ('Licuadora', 2.3, 500, 1.4, 3.2, 300, 700),
    ('Tostadora', 4.5, 1000, 3.6, 5.5, 800, 1200),
    ('Secador de Pelo', 6.8, 1500, 5.5, 8.2, 1200, 1800),
    ('Cafetera', 3.6, 800, 2.7, 4.5, 600, 1000),
    ('Batidora', 1.4, 300, 0.9, 2.3, 200, 500),
    ('Horno Eléctrico', 9.1, 2000, 6.8, 11.4, 1500, 2500),
    ('Refrigerador', 0.7, 150, 0.5, 1.4, 100, 300),
    ('Lavadora', 3.6, 800, 2.3, 6.8, 500, 1500),
    ('Secadora', 13.6, 3000, 11.4, 15.9, 2500, 3500),
    ('Aire Acondicionado 12.000 BTU', 5.5, 1200, 4.5, 7, 1000, 1500),
    ('Aire Acondicionado 18.000 BTU', 8.2, 1800, 6.8, 9.1, 1500, 2000),
    ('Aire Acondicionado 24.000 BTU', 10.9, 2400, 9.1, 13.6, 2000, 3000),
    ('Calefactor', 6.8, 1500, 4.5, 9.1, 1000, 2000),
    ('Ventilador', 0.2, 50, 0.1, 0.3, 30, 70),
    ('Lámpara', 0.2, 40, 0.1, 0.3, 20, 60);