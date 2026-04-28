const db = require('../config/db');

exports.getDeliveries = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT d.*, r.item_name, r.description, u.name as requester_name,
              lu.name as logistics_name
       FROM deliveries d
       JOIN requests r ON d.request_id = r.id
       JOIN users u ON r.user_id = u.id
       LEFT JOIN users lu ON d.logistics_id = lu.id
       ORDER BY d.updated_at DESC`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateDeliveryStatus = async (req, res) => {
  const { delivery_id, status, latitude, longitude } = req.body;
  const logistics_id = req.user.id;

  if (!delivery_id || !status)
    return res.status(400).json({ message: 'Delivery ID and status required' });

  try {
    await db.query(
      'UPDATE deliveries SET status = ?, logistics_id = ?, latitude = ?, longitude = ? WHERE id = ?',
      [status, logistics_id, latitude || 0, longitude || 0, delivery_id]
    );
    // Sync request status
    await db.query(
      'UPDATE requests SET status = ? WHERE id = (SELECT request_id FROM deliveries WHERE id = ?)',
      [status, delivery_id]
    );
    res.json({ message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getMyDeliveries = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT d.*, r.item_name, r.description, u.name as requester_name
       FROM deliveries d
       JOIN requests r ON d.request_id = r.id
       JOIN users u ON r.user_id = u.id
       WHERE d.logistics_id = ?
       ORDER BY d.updated_at DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
