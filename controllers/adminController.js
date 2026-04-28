const db = require('../config/db');

exports.getUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const [[{ total_users }]] = await db.query('SELECT COUNT(*) as total_users FROM users');
    const [[{ total_campaigns }]] = await db.query('SELECT COUNT(*) as total_campaigns FROM campaigns');
    const [[{ total_donations, total_items }]] = await db.query(
      'SELECT COUNT(*) as total_donations, COALESCE(SUM(quantity), 0) as total_items FROM donations'
    );
    const [[{ total_requests }]] = await db.query('SELECT COUNT(*) as total_requests FROM requests');
    res.json({ total_users, total_campaigns, total_donations, total_items, total_requests });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
