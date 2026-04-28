const db = require('../config/db');

exports.createRequest = async (req, res) => {
  const { item_name, description } = req.body;
  const user_id = req.user.id;

  if (!item_name)
    return res.status(400).json({ message: 'Item name is required' });

  try {
    const [result] = await db.query(
      'INSERT INTO requests (user_id, item_name, description) VALUES (?, ?, ?)',
      [user_id, item_name, description]
    );
    // Auto-create delivery record
    await db.query('INSERT INTO deliveries (request_id) VALUES (?)', [result.insertId]);
    res.status(201).json({ message: 'Request submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getMyRequests = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT r.*, d.status as delivery_status, d.latitude, d.longitude, u.name as logistics_name
       FROM requests r
       LEFT JOIN deliveries d ON r.id = d.request_id
       LEFT JOIN users u ON d.logistics_id = u.id
       WHERE r.user_id = ?
       ORDER BY r.created_at DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT r.*, u.name as requester_name, d.status as delivery_status, d.id as delivery_id, lu.name as logistics_name
       FROM requests r
       JOIN users u ON r.user_id = u.id
       LEFT JOIN deliveries d ON r.id = d.request_id
       LEFT JOIN users lu ON d.logistics_id = lu.id
       ORDER BY r.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
