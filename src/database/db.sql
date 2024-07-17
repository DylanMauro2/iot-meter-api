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
    voltaje_nominal DECIMAL(5, 2) NOT NULL,
    amperaje_nominal DECIMAL(5, 2) NOT NULL,
    potencia_nominal DECIMAL(5, 2) NOT NULL,
    umbral_voltaje_min DECIMAL(5, 2),
    umbral_voltaje_max DECIMAL(5, 2),
    umbral_amperaje_min DECIMAL(5, 2),
    umbral_amperaje_max DECIMAL(5, 2),
    umbral_potencia_min DECIMAL(5, 2),
    umbral_potencia_max DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE medicion (
    medicion_id SERIAL PRIMARY KEY,
    electrodomestico_id INT REFERENCES electrodomestico(electrodomestico_id),
    voltaje DECIMAL(5, 2) NOT NULL, /* Voltaje */
    corriente DECIMAL(5, 2) NOT NULL, /* Amperes */
    potencia DECIMAL(5, 2) NOT NULL, /* Watts */
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


