
-- Create database
CREATE DATABASE IF NOT EXISTS store_rating_system;
USE store_rating_system;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  role ENUM('admin', 'normal', 'store') NOT NULL DEFAULT 'normal',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create stores table
CREATE TABLE IF NOT EXISTS stores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  address VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(255) DEFAULT '/placeholder.svg',
  owner_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create ratings table
CREATE TABLE IF NOT EXISTS ratings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  store_id INT NOT NULL,
  user_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_store (user_id, store_id)
);

-- Create view for store ratings
CREATE OR REPLACE VIEW store_ratings AS
SELECT 
  s.id AS store_id,
  s.name AS store_name,
  COALESCE(AVG(r.rating), 0) AS average_rating,
  COUNT(r.id) AS total_ratings
FROM stores s
LEFT JOIN ratings r ON s.id = r.store_id
GROUP BY s.id;

-- Insert sample data

-- Admin user
INSERT INTO users (name, email, password, address, role)
VALUES ('Admin User', 'admin@example.com', '$2a$10$XVs4CuZiUeL9w5gv9XE7U.kl02QgXjcT94tapF2g0yvJmWQQdcELK', '123 Admin St, Admin City', 'admin');

-- Normal users
INSERT INTO users (name, email, password, address, role)
VALUES 
('Jane Smith', 'jane@example.com', '$2a$10$XVs4CuZiUeL9w5gv9XE7U.kl02QgXjcT94tapF2g0yvJmWQQdcELK', '456 Oak St, User City', 'normal'),
('Bob Johnson', 'bob@example.com', '$2a$10$XVs4CuZiUeL9w5gv9XE7U.kl02QgXjcT94tapF2g0yvJmWQQdcELK', '789 Pine St, User City', 'normal');

-- Store owners
INSERT INTO users (name, email, password, address, role)
VALUES 
('Coffee Shop Owner', 'coffee@example.com', '$2a$10$XVs4CuZiUeL9w5gv9XE7U.kl02QgXjcT94tapF2g0yvJmWQQdcELK', '101 Shop St, Store City', 'store'),
('Tech Store Owner', 'tech@example.com', '$2a$10$XVs4CuZiUeL9w5gv9XE7U.kl02QgXjcT94tapF2g0yvJmWQQdcELK', '202 Electronic Ave, Store City', 'store');

-- Stores
INSERT INTO stores (name, email, address, description, owner_id)
VALUES 
('Coffee Haven', 'info@coffeehaven.com', '123 Main St, New York', 'A cozy coffee shop with a wide variety of specialty coffees and pastries.', 4),
('Tech Galaxy', 'support@techgalaxy.com', '456 Broadway, San Francisco', 'The latest in technology gadgets and accessories.', 5),
('Fashion World', 'contact@fashionworld.com', '789 Fashion Ave, Los Angeles', 'Trendy clothing and accessories for all seasons.', NULL);

-- Ratings
INSERT INTO ratings (store_id, user_id, rating)
VALUES 
(1, 2, 5),
(1, 3, 4),
(2, 2, 3),
(2, 3, 4),
(3, 2, 5);
