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
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    marca VARCHAR(255),
    modelo VARCHAR(255),
    voltaje_nominal DECIMAL(5, 2) NOT NULL DEFAULT 220,
    amperaje_nominal DECIMAL(5, 2) NOT NULL,
    potencia_nominal DECIMAL(5, 2) NOT NULL,
    umbral_voltaje_min DECIMAL(5, 2),
    umbral_voltaje_max DECIMAL(5, 2),
    umbral_amperaje_min DECIMAL(5, 2),
    umbral_amperaje_max DECIMAL(5, 2),
    umbral_potencia_min DECIMAL(5, 2),
    umbral_potencia_max DECIMAL(5, 2),
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
    voltaje DECIMAL(5, 2) NOT NULL DEFAULT 220, 
    amperaje DECIMAL(5, 2) NOT NULL, 
    potencia DECIMAL(5, 2) NOT NULL, 
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


ALTER TABLE electrodomestico ALTER COLUMN umbral_voltaje_min SET DEFAULT 198;
ALTER TABLE electrodomestico ALTER COLUMN umbral_voltaje_max SET DEFAULT 244;

UPDATE electrodomestico SET umbral_voltaje_min = 198;
UPDATE electrodomestico SET umbral_voltaje_max = 244;



