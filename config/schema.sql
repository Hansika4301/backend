-- Run this SQL in your MySQL client to set up the database

CREATE DATABASE IF NOT EXISTS donationconnect;
USE donationconnect;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('donor', 'recipient', 'logistics', 'admin') DEFAULT 'donor',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS campaigns (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  goal_amount INT DEFAULT 0,
  items_count INT DEFAULT 0,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS donations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  campaign_id INT NOT NULL,
  item_name VARCHAR(200) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  description TEXT,
  donated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  item_name VARCHAR(200) NOT NULL,
  description TEXT,
  status ENUM('pending', 'accepted', 'delivery', 'delivered') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS deliveries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  request_id INT NOT NULL,
  logistics_id INT,
  status ENUM('pending', 'accepted', 'delivery', 'delivered') DEFAULT 'pending',
  latitude DECIMAL(10,8) DEFAULT 0,
  longitude DECIMAL(11,8) DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (request_id) REFERENCES requests(id) ON DELETE CASCADE,
  FOREIGN KEY (logistics_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Seed admin user (password: admin123)
INSERT IGNORE INTO users (name, email, password, role) VALUES
('Admin User', 'admin@donationconnect.com', '$2a$10$1PsZ8yAJPJvxJPEx0g5NDu/rI5nj2LJHka1swajjrY4yp2Hhi2WmW', 'admin');

-- Seed sample campaigns
INSERT IGNORE INTO campaigns (title, description, image_url, goal_amount, items_count, created_by) VALUES
('Food for Families', 'Help provide nutritious meals to underprivileged families in need across the region.', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600', 500, 0, 1),
('Clean Water Initiative', 'Bringing clean and safe drinking water to rural communities lacking basic infrastructure.', 'https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=600', 300, 0, 1),
('Education for All', 'Providing school supplies, books, and scholarships to children from low-income families.', 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600', 400, 0, 1),
('Medical Aid Fund', 'Supporting medical treatments and healthcare access for those who cannot afford it.', 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600', 600, 0, 1);
