-- Tabla de Usuarios
CREATE TABLE "Users" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  eliminar BOOLEAN DEFAULT true NOT NULL,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- Tabla de Cursos
CREATE TABLE "Courses" (
  id SERIAL PRIMARY KEY,
  userId INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0.00, -- Añadido el precio del curso con valor predeterminado
  eliminar BOOLEAN DEFAULT true NOT NULL,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES "Users" (id) ON DELETE CASCADE
);
-- Tabla de Lecciones
CREATE TABLE "Lessons" (
    id SERIAL PRIMARY KEY,
    courseId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    position INT NOT NULL,
    imagePath VARCHAR(255),
    eliminated BOOLEAN DEFAULT false NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (courseId) REFERENCES "Courses"(id) ON DELETE CASCADE,
    UNIQUE(courseId, position)
);
-- Tabla de Lecciones Contenido
CREATE TABLE "LessonContent" (
  id SERIAL PRIMARY KEY,
  url VARCHAR(255) NOT NULL,
  lessonId INT NOT NULL,
  courseId INT NOT NULL,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lessonId) REFERENCES "Lessons" (id) ON DELETE CASCADE,
  FOREIGN KEY (courseId) REFERENCES "Courses" (id) ON DELETE CASCADE
);
-- Tabla de Comentarios
CREATE TABLE "Comments" (
  id SERIAL PRIMARY KEY,
  lessonId INT NOT NULL,
  userId INT NOT NULL,
  content TEXT NOT NULL,
  eliminar BOOLEAN DEFAULT true NOT NULL,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lessonId) REFERENCES "Lessons" (id) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES "Users" (id) ON DELETE CASCADE
);
-- Tabla de Compras
CREATE TABLE "Purchases" (
  id SERIAL PRIMARY KEY,
  userId INT NOT NULL,
  paymentMethod VARCHAR(255) NOT NULL,
  cardNumber VARCHAR(20), -- Número de la tarjeta (cifrado en la aplicación)
  cardHolderName VARCHAR(255), -- Nombre del titular de la tarjeta
  cardExpirationDate DATE, -- Fecha de expiración de la tarjeta
  totalAmount DECIMAL(10, 2) NOT NULL, -- Monto total de la compra
  purchaseTime TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  eliminar BOOLEAN DEFAULT true NOT NULL,
  FOREIGN KEY (userId) REFERENCES "Users" (id) ON DELETE CASCADE
);
-- Tabla de details de Compra
CREATE TABLE "PurchaseDetails" (
  id SERIAL PRIMARY KEY,
  purchaseId INT NOT NULL,
  courseId INT NOT NULL,
  coursePrice DECIMAL(10, 2) NOT NULL, -- Precio del curso
  userId INT NOT NULL,
  FOREIGN KEY (purchaseId) REFERENCES "Purchases" (id) ON DELETE CASCADE,
  FOREIGN KEY (courseId) REFERENCES "Courses" (id) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES "Users" (id) ON DELETE CASCADE,
  UNIQUE (purchaseId, courseId),
  UNIQUE (userId, courseId)
);

CREATE TABLE "Tablatures" (
  id SERIAL PRIMARY KEY,
  userId INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255),
  content TEXT NOT NULL,
  eliminar BOOLEAN DEFAULT true NOT NULL,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES "Users" (id) ON DELETE CASCADE
);
-- Metodos

-- Para crear nuevo usuario
CREATE OR REPLACE FUNCTION create_user_if_not_exists(
    p_name VARCHAR,
    p_email VARCHAR,
    p_password VARCHAR
)
RETURNS TABLE (
    user_id INT,
    user_name VARCHAR,
    user_email VARCHAR,
    user_password VARCHAR
) AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM "Users" WHERE email = p_email AND eliminar = true) THEN
        RETURN;
    ELSIF EXISTS (SELECT 1 FROM "Users" WHERE email = p_email AND eliminar = false) THEN
        RETURN QUERY
        UPDATE "Users"
        SET name = p_name, password = p_password, updatedAt = CURRENT_TIMESTAMP, eliminar = true
        WHERE email = p_email
        RETURNING id, name, email, password;
    ELSE
        RETURN QUERY
        INSERT INTO "Users" (name, email, password)
        VALUES (p_name, p_email, p_password)
        RETURNING id, name, email, password;
    END IF;
END;
$$ LANGUAGE plpgsql;





ALTER TABLE "LessonContent" ADD COLUMN tipo VARCHAR(255) NOT NULL DEFAULT 'youtuber';


-- Eliminar el trigger y la función si existen
DROP TRIGGER IF EXISTS set_course_id_trigger ON "LessonContent";
DROP FUNCTION IF EXISTS set_course_id();

-- Función para actualizar courseId en LessonContent
CREATE OR REPLACE FUNCTION set_course_id()
RETURNS TRIGGER AS $$
BEGIN
    -- Actualizar el courseId en LessonContent basado en el lessonId
    NEW.courseId := (SELECT courseId FROM "Lessons" WHERE id = NEW.lessonId);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Disparador para ejecutar la función antes de insertar en LessonContent
CREATE TRIGGER set_course_id_trigger
BEFORE INSERT ON "LessonContent"
FOR EACH ROW
EXECUTE PROCEDURE set_course_id();

