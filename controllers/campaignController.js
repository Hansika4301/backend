const db = require('../config/db');

exports.getCampaigns = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT c.*, u.name as creator_name FROM campaigns c LEFT JOIN users u ON c.created_by = u.id ORDER BY c.created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createCampaign = async (req, res) => {
  const { title, description, image_url, goal_amount } = req.body;
  const created_by = req.user.id;

  if (!title || !goal_amount)
    return res.status(400).json({ message: 'Title and goal amount are required' });

  try {
    const [result] = await db.query(
      'INSERT INTO campaigns (title, description, image_url, goal_amount, created_by) VALUES (?, ?, ?, ?, ?)',
      [title, description, image_url, goal_amount, created_by]
    );
    const [rows] = await db.query('SELECT * FROM campaigns WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteCampaign = async (req, res) => {
  try {
    await db.query('DELETE FROM campaigns WHERE id = ?', [req.params.id]);
    res.json({ message: 'Campaign deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
