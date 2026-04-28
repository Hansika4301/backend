-- Run this ONLY if you already have the database running from the original schema.
-- Skip this file if you are running schema.sql fresh.

USE donationconnect;

-- Step 1: Recreate donations table with item-based columns
DROP TABLE IF EXISTS donations;

CREATE TABLE donations (
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

-- Step 2: Swap raised_amount for items_count on campaigns
ALTER TABLE campaigns
  DROP COLUMN raised_amount,
  ADD COLUMN items_count INT DEFAULT 0,
  MODIFY COLUMN goal_amount INT DEFAULT 0;
